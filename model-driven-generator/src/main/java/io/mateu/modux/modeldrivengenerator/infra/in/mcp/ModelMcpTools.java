package io.mateu.modux.modeldrivengenerator.infra.in.mcp;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintFinding;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.LintSeverity;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelLintService;
import io.mateu.modux.modeldrivengenerator.application.usecases.model.search.SearchModelQueryService;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.aicomplete.AiCompleteCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.aicomplete.AiCompleteCodeUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.recipes.ApplyRecipeUseCase;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GlobalIdPolicy;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelJsonSchemaGenerator;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * The MCP tool catalog for model authoring: generic CRUD over every element type in the store,
 * plus the validation loop (integrity check + lint) and code generation. This is how an AI agent
 * builds a modux spec conversationally — upsert an element, get the violations back in the same
 * turn, fix, iterate — closing the loop promised by spec-driven development.
 *
 * <p>Tools are generic over {@link ElementTypeRegistry} so new element types in {@code AllData}
 * appear here automatically, with their JSON schema available via {@code get_element_schema}.
 */
@Service
@RequiredArgsConstructor
public class ModelMcpTools {

    private final ModelStore repository;
    private final ElementTypeRegistry registry;
    private final ModelJsonSchemaGenerator schemaGenerator;
    private final CheckModelUseCase checkModelUseCase;
    private final io.mateu.modux.modeldrivengenerator.application.usecases.model.clean.CleanModelUseCase cleanModelUseCase;
    private final ModelLintService modelLintService;
    private final SearchModelQueryService searchModelQueryService;
    private final GenerateCodeUseCase generateCodeUseCase;
    private final ApplyRecipeUseCase applyRecipeUseCase;
    private final io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService coherenceService;
    private final AiCompleteCodeUseCase aiCompleteCodeUseCase;
    private final GlobalIdPolicy idPolicy;

    private final io.mateu.modux.modeldrivengenerator.application.out.store.WorkspaceStore workspace;
    private final io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionDiffService diffService;
    private final io.mateu.modux.modeldrivengenerator.infra.out.git.SolutionMergeService mergeService;
    private final ObjectMapper json = new ObjectMapper();
    private final YAMLMapper yaml = io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.ModelYaml.writer();

    /** One MCP tool: name, what it does, and the JSON schema of its arguments. */
    public record ToolSpec(String name, String description, Map<String, Object> inputSchema) {
    }

    public List<ToolSpec> tools() {
        return List.of(
                new ToolSpec("bootstrap_project",
                        "Step 1 of the authoring path in ONE call: create a project, its service and its "
                                + "boundedContexts, wired together. Extract the names and the objective from the user's "
                                + "natural-language description; then continue with models (step 2) — the linter "
                                + "guides from there.",
                        obj(Map.of(
                                        "projectId", str("Id of the new project (kebab-case)"),
                                        "name", str("Project display name"),
                                        "packageName", str("Java base package, e.g. com.acme.booking"),
                                        "outputPath", str("Directory where the code will be generated"),
                                        "objective", str("The system's objective, in prose (from the user's description; feeds the HLA)"),
                                        "serviceId", str("Id of the service (defaults to <projectId>-svc)"),
                                        "boundedContexts", Map.of(
                                                "type", "array",
                                                "description", "The bounded contexts, from the description",
                                                "items", obj(Map.of(
                                                                "id", str("BoundedContext id (kebab-case)"),
                                                                "name", str("BoundedContext name"),
                                                                "description", str("Responsibility of the boundedContext, in prose"),
                                                                "subdomainType", Map.of("type", "string",
                                                                        "enum", List.of("CORE", "SUPPORTING", "GENERIC"),
                                                                        "description", "Strategic classification")),
                                                        List.of("id", "name")))),
                                List.of("projectId", "name", "packageName", "outputPath", "boundedContexts"))),
                new ToolSpec("list_element_types",
                        "List every element type in the modux model (aggregates, useCases, flows, processes…) "
                                + "with the number of elements currently in the store. Start here to see the model's shape.",
                        obj(Map.of(), List.of())),
                new ToolSpec("render_context_map",
                        "The project's context map RENDERED as a self-contained SVG: bounded contexts "
                                + "and external systems as nodes, strategic relations as solid edges, "
                                + "runtime flows dashed and coloured by coherence. Show it to the user "
                                + "(save to a file, embed in chat) — it is a read-only projection of "
                                + "the model, always current.",
                        obj(Map.of(), List.of())),
                new ToolSpec("list_elements",
                        "List the elements of one type (id and name).",
                        obj(Map.of("type", str("Element type name as returned by list_element_types, e.g. 'aggregates'")),
                                List.of("type"))),
                new ToolSpec("search_elements",
                        "Full-text search across the whole model: matches when the text appears in an "
                                + "element's id, name, or ANY line of its YAML (descriptions, fields, "
                                + "invariants, step intents…). Case-insensitive; returns type, id, name "
                                + "and the matching lines, ranked id > name > content.",
                        obj(Map.of("query", str("Text to look for anywhere in the elements")),
                                List.of("query"))),
                new ToolSpec("get_element",
                        "Read one element, returned as YAML exactly as it would appear in the store.",
                        obj(Map.of(
                                        "type", str("Element type name, e.g. 'aggregates'"),
                                        "id", str("The element id")),
                                List.of("type", "id"))),
                new ToolSpec("get_element_schema",
                        "The JSON schema of one element type. Call this before upsert_element to know the exact "
                                + "fields, enums and nested structures the type accepts.",
                        obj(Map.of("type", str("Element type name, e.g. 'aggregates'")),
                                List.of("type"))),
                new ToolSpec("upsert_element",
                        "Create or update one element (matched by id) and persist the store. Returns the dangling "
                                + "references the element introduces, so you can fix them in the same conversation.",
                        obj(Map.of(
                                        "type", str("Element type name, e.g. 'aggregates'"),
                                        "element", Map.of("type", "object",
                                                "description", "The full element, matching get_element_schema for the type. "
                                                        + "Must include a non-blank 'id'. Unknown fields are rejected.")),
                                List.of("type", "element"))),
                new ToolSpec("delete_element",
                        "Delete one element by id and persist the store. Returns the references that become "
                                + "dangling, so you can clean them up.",
                        obj(Map.of(
                                        "type", str("Element type name, e.g. 'aggregates'"),
                                        "id", str("The element id")),
                                List.of("type", "id"))),
                new ToolSpec("check_model",
                        "Referential-integrity check over the whole model: every *Id/*Ids reference must point at "
                                + "an existing element. Returns the dangling references (empty = clean).",
                        obj(Map.of(), List.of())),
                new ToolSpec("clean_model",
                        "Find the model's orphans: elements that reference nothing and that nothing references "
                                + "(a bounded context pairs with its auto-created main module). Without 'apply' it "
                                + "only reports; apply=true deletes them and persists the store.",
                        obj(Map.of("apply", Map.of(
                                        "type", "boolean",
                                        "description", "Delete the orphans (default false: only report them).")),
                                List.of())),
                new ToolSpec("lint_model",
                        "Run the full model linter: referential integrity plus the architectural/semantic rule "
                                + "catalog (lifecycle coherence, idempotency, DLQ, PII, tenancy…). Run this after a "
                                + "batch of edits and before generating code.",
                        obj(Map.of("severity", Map.of(
                                        "type", "string",
                                        "enum", List.of("ERROR", "WARNING", "INFO"),
                                        "description", "Only return findings of this severity and above "
                                                + "(ERROR < WARNING < INFO). Default: all.")),
                                List.of())),
                new ToolSpec("workspace_status",
                        "System/solutions workspace: the active branch (main = the as-is), the open "
                                + "solutions, and the semantic diff summary of the current one.",
                        obj(Map.of(), List.of())),
                new ToolSpec("create_solution",
                        "Branch a new TO-BE solution off the system and switch to it. Work there, then "
                                + "walk it through set_solution_status and merge_solution.",
                        obj(Map.of("name", str("Solution name")), List.of("name"))),
                new ToolSpec("switch_solution",
                        "Check out a workspace: 'main' (the system) or a solution branch id.",
                        obj(Map.of("branch", str("'main' or 'solution/<slug>'")), List.of("branch"))),
                new ToolSpec("solution_diff",
                        "The semantic diff of the current solution against the system, element by element "
                                + "(ADDED/MODIFIED/REMOVED). Empty on the system.",
                        obj(Map.of(), List.of())),
                new ToolSpec("set_solution_status",
                        "Move the current solution through its lifecycle: EXPLORING → PROPOSED → APPROVED. "
                                + "APPROVED enforces the gate (green lint + no open decisions).",
                        obj(Map.of("status", Map.of("type", "string",
                                        "enum", List.of("PROPOSED", "APPROVED"),
                                        "description", "Target status")),
                                List.of("status"))),
                new ToolSpec("merge_solution",
                        "Semantic merge of the APPROVED current solution into the system (it becomes the new "
                                + "as-is and the branch is archived). Conflicts (same element changed on both "
                                + "sides) must come resolved in 'resolutions'.",
                        obj(Map.of("resolutions", Map.of("type", "object",
                                        "description", "Conflict key ('type:id') → 'system' | 'solution'",
                                        "additionalProperties", Map.of("type", "string"))),
                                List.of())),
                new ToolSpec("update_solution_from_system",
                        "Bring the system's advances into the current solution (the semantic rebase); same "
                                + "resolutions contract as merge_solution.",
                        obj(Map.of("resolutions", Map.of("type", "object",
                                        "description", "Conflict key ('type:id') → 'system' | 'solution'",
                                        "additionalProperties", Map.of("type", "string"))),
                                List.of())),
                new ToolSpec("list_recipes",
                        "List the starter recipes: parameterized templates that emit intent-layer elements "
                                + "(flows, processes) instead of structural pieces. Prefer a recipe over building "
                                + "structure by hand when one matches the goal.",
                        obj(Map.of(), List.of())),
                new ToolSpec("apply_recipe",
                        "Apply a starter recipe with its parameters (see list_recipes). Returns the created "
                                + "element ids; run lint_model afterwards — the linter guides you through whatever "
                                + "the recipe left open (roles, use cases…).",
                        obj(Map.of(
                                        "recipe", str("Recipe id, e.g. 'materialized-read-model'"),
                                        "params", Map.of("type", "object",
                                                "description", "Recipe parameters as string key/values",
                                                "additionalProperties", Map.of("type", "string"))),
                                List.of("recipe", "params"))),
                new ToolSpec("propose_implementations",
                        "Run AI completion (like `mvn modux:ai-complete`): for every two-zone hook whose spec "
                                + "lives in the model — invariants, operation preconditions, CUSTOM operations and "
                                + "Custom steps with a natural-language intent, BDD scenarios — an AI proposes the "
                                + "implementation into AI-PROPOSALS.md files for the developer to review. Requires "
                                + "ANTHROPIC_API_KEY in the server's environment. Generate the code first.",
                        obj(Map.of(
                                        "projectId", str("Id of the project whose hooks to complete"),
                                        "model", str("Claude model id (default claude-haiku-4-5-20251001)"),
                                        "outputPath", str("Optional output directory; defaults to the project's stored outputPath")),
                                List.of("projectId"))),
                new ToolSpec("generate_code",
                        "Generate the code for a project from the current model. Equivalent to the CLI "
                                + "--modux.generate. Lint first: an inconsistent model may generate broken output.",
                        obj(Map.of(
                                        "projectId", str("Id of the project to generate (an element of 'projects')"),
                                        "outputPath", str("Optional output directory; defaults to the project's stored outputPath")),
                                List.of("projectId"))));
    }

    /** Dispatch a tool call; the returned text is the MCP text content. Throws on tool errors. */
    public String call(String tool, JsonNode args) throws Exception {
        return switch (tool) {
            case "bootstrap_project" -> bootstrapProject(args);
            case "list_element_types" -> listElementTypes();
            case "render_context_map" -> renderContextMap();
            case "list_elements" -> listElements(requireText(args, "type"));
            case "search_elements" -> searchElements(requireText(args, "query"));
            case "get_element" -> getElement(requireText(args, "type"), requireText(args, "id"));
            case "get_element_schema" -> getElementSchema(requireText(args, "type"));
            case "upsert_element" -> upsertElement(requireText(args, "type"), args.get("element"));
            case "delete_element" -> deleteElement(requireText(args, "type"), requireText(args, "id"));
            case "check_model" -> checkModel();
            case "clean_model" -> args != null && args.hasNonNull("apply") && args.get("apply").asBoolean()
                    ? cleanModelUseCase.deleteOrphans()
                    : cleanModelUseCase.report();
            case "lint_model" -> lintModel(args != null && args.hasNonNull("severity") ? args.get("severity").asText() : null);
            case "workspace_status" -> workspaceStatus();
            case "create_solution" -> { workspace.createSolution(requireText(args, "name")); yield workspaceStatus(); }
            case "switch_solution" -> { workspace.switchTo(requireText(args, "branch")); yield workspaceStatus(); }
            case "solution_diff" -> yamlOf(diffService.diffAgainstSystem());
            case "set_solution_status" -> yamlOf(mergeService.setStatus(requireText(args, "status")));
            case "merge_solution" -> { mergeService.mergeIntoSystem(resolutions(args)); yield workspaceStatus(); }
            case "update_solution_from_system" -> { mergeService.updateFromSystem(resolutions(args)); yield workspaceStatus(); }
            case "list_recipes" -> listRecipes();
            case "apply_recipe" -> applyRecipe(requireText(args, "recipe"), args.get("params"));
            case "propose_implementations" -> proposeImplementations(requireText(args, "projectId"),
                    args.hasNonNull("model") ? args.get("model").asText() : null,
                    args.hasNonNull("outputPath") ? args.get("outputPath").asText() : null);
            case "generate_code" -> generateCode(requireText(args, "projectId"),
                    args.hasNonNull("outputPath") ? args.get("outputPath").asText() : null);
            default -> throw new IllegalArgumentException("Unknown tool '" + tool + "'");
        };
    }

    /** One-call topology: the deterministic landing point for a natural-language description. */
    private String bootstrapProject(JsonNode args) throws Exception {
        var projectId = requireText(args, "projectId");
        var serviceId = args.hasNonNull("serviceId") && !args.get("serviceId").asText().isBlank()
                ? args.get("serviceId").asText() : projectId + "-svc";
        var boundedContexts = args.get("boundedContexts");
        if (boundedContexts == null || !boundedContexts.isArray() || boundedContexts.isEmpty()) {
            throw new IllegalArgumentException("'boundedContexts' must be a non-empty array — carve the description"
                    + " into at least one bounded context.");
        }

        var boundedContextIds = new java.util.ArrayList<String>();
        for (var boundedContext : boundedContexts) {
            if (!boundedContext.hasNonNull("id") || boundedContext.get("id").asText().isBlank()) {
                throw new IllegalArgumentException("Every boundedContext needs an id.");
            }
            boundedContextIds.add(boundedContext.get("id").asText());
            // validate the shape up front — nothing is persisted until every layer parses
            try {
                json.treeToValue(boundedContext, registry.classFor("boundedContexts"));
            } catch (JacksonException e) {
                throw new IllegalArgumentException(schemaMismatchMessage("boundedContexts", e));
            }
        }
        var mainModuleIds = boundedContextIds.stream()
                .map(io.mateu.modux.modeldrivengenerator.application.usecases.model.topology.ModuleTopology::mainModuleId)
                .toList();
        for (var newId : java.util.stream.Stream.concat(
                java.util.stream.Stream.concat(java.util.stream.Stream.of(projectId, serviceId),
                        boundedContextIds.stream()), mainModuleIds.stream()).toList()) {
            var owner = idPolicy.conflict(newId, "n/a").orElse(null);
            if (owner != null) {
                throw new IllegalArgumentException("Id '" + newId + "' already exists (in " + owner
                        + "). Nothing was created — pick unique ids for the whole topology.");
            }
        }

        // build the three layers as JSON so this stays generic over the entities
        var project = json.createObjectNode();
        project.put("id", projectId);
        project.put("name", requireText(args, "name"));
        project.put("packageName", requireText(args, "packageName"));
        project.put("outputPath", requireText(args, "outputPath"));
        if (args.hasNonNull("objective")) {
            project.put("objective", args.get("objective").asText());
        }
        project.putArray("serviceIds").add(serviceId);

        var service = json.createObjectNode();
        service.put("id", serviceId);
        // the service name drives the generated directory layout — default to the project id
        service.put("name", projectId);
        var serviceModules = service.putArray("moduleIds");
        mainModuleIds.forEach(serviceModules::add);

        // reuse upsert so uniqueness/shape checks and persistence behave identically
        upsertElement("projects", project);
        upsertElement("services", service);
        for (var boundedContext : boundedContexts) {
            upsertElement("boundedContexts", boundedContext);
            // every context is born with its main module — the unit the service deploys
            var module = json.createObjectNode();
            var boundedContextId = boundedContext.get("id").asText();
            module.put("id", io.mateu.modux.modeldrivengenerator.application.usecases.model.topology.ModuleTopology.mainModuleId(boundedContextId));
            module.put("name", boundedContext.hasNonNull("name") ? boundedContext.get("name").asText() : boundedContextId);
            module.put("boundedContextId", boundedContextId);
            module.put("main", true);
            upsertElement("modules", module);
        }

        return "Project '" + projectId + "' bootstrapped: service '" + serviceId + "' with boundedContext(s) "
                + String.join(", ", boundedContextIds) + ". Store persisted.\n"
                + "Next (the authoring path): create the models of each boundedContext (step 2); add an aggregate "
                + "only where there are invariants or a lifecycle to protect — and declare those "
                + "invariants on it; then relations as intent (apply_recipe / flows), workflows for "
                + "cross-context orchestration (human steps carry roleId, deadline and formPageId), and "
                + "run lint_model — its findings are the to-do list.";
    }

    private String listElementTypes() {
        var lines = registry.all().entrySet().stream()
                .map(e -> "- " + e.getKey() + ": " + repository.findAllOfType(e.getValue()).size() + " element(s)")
                .collect(Collectors.joining("\n"));
        return "Element types in the model store:\n" + lines;
    }

    private String renderContextMap() {
        var nodes = new java.util.ArrayList<io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.Node>();
        repository.findAllOfType(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity.class)
                .forEach(m -> nodes.add(new io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.Node(
                        m.id(), m.name(), m.subdomainType(), false)));
        repository.findAllOfType(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity.class)
                .forEach(p -> p.externalSystems().forEach(x -> nodes.add(
                        io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.Node.external(x.id(), x.name()))));
        var relations = repository.findAllOfType(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity.class).stream()
                .flatMap(p -> p.contextMap().stream())
                .map(r -> new io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.Relation(
                        r.sourceBoundedContextId(), r.targetBoundedContextId(), parseRelationType(r.type())))
                .toList();
        var flows = coherenceService.analyze().stream()
                .filter(f -> f.sourceBoundedContextId() != null && f.targetBoundedContextId() != null)
                .map(f -> new io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.Flow(
                        f.sourceBoundedContextId(), f.targetBoundedContextId(), f.flowName(), f.status(), f.suggestedType()))
                .toList();
        var inner = io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.render(nodes, relations, flows);
        return "<svg viewBox=\"" + io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapSvgRenderer.viewBox()
                + "\" xmlns=\"http://www.w3.org/2000/svg\" width=\"960\" height=\"640\">" + inner + "</svg>";
    }

    private static io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType parseRelationType(String type) {
        if (type == null) return null;
        try {
            return io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType.valueOf(type);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    private String listElements(String typeName) {
        var elements = repository.findAllOfType(registry.classFor(typeName));
        if (elements.isEmpty()) {
            return "No elements of type '" + typeName + "'.";
        }
        return elements.stream()
                .filter(e -> e instanceof Identifiable)
                .sorted(java.util.Comparator.comparing(e -> ((Identifiable) e).id()))
                .map(e -> {
                    var name = nameOf(e);
                    return "- " + ((Identifiable) e).id() + (name != null ? " — " + name : "");
                })
                .collect(Collectors.joining("\n", elements.size() + " " + typeName + ":\n", ""));
    }

    private String searchElements(String query) {
        var matches = searchModelQueryService.search(query).stream()
                .map(hit -> "- " + hit.type() + " " + hit.id()
                        + (hit.name() != null ? " — " + hit.name() : "")
                        + (hit.snippet() != null ? ": " + hit.snippet() : ""))
                .toList();
        return matches.isEmpty() ? "No elements match '" + query + "'."
                : matches.size() + " match(es):\n" + String.join("\n", matches);
    }

    private String getElement(String typeName, String id) throws Exception {
        var element = repository.findById(id, registry.classFor(typeName))
                .orElseThrow(() -> new IllegalArgumentException(
                        "No element '" + id + "' of type '" + typeName + "'. Use list_elements or search_elements."));
        return yaml.writeValueAsString(element);
    }

    private String getElementSchema(String typeName) throws Exception {
        var schema = schemaGenerator.schemaFor(registry.classFor(typeName));
        return json.writerWithDefaultPrettyPrinter().writeValueAsString(schema);
    }

    private String upsertElement(String typeName, JsonNode elementNode) {
        var type = registry.classFor(typeName);
        if (elementNode == null || !elementNode.isObject()) {
            throw new IllegalArgumentException("'element' must be a JSON object matching get_element_schema('"
                    + typeName + "').");
        }
        Object element;
        try {
            element = json.treeToValue(elementNode, type);
        } catch (JacksonException e) {
            throw new IllegalArgumentException(schemaMismatchMessage(typeName, e));
        }
        if (!(element instanceof Identifiable identifiable) || identifiable.id() == null || identifiable.id().isBlank()) {
            throw new IllegalArgumentException("The element must have a non-blank 'id'.");
        }
        var existed = repository.findById(identifiable.id(), type).isPresent();
        if (!existed) {
            var conflict = idPolicy.conflict(identifiable.id(), typeName).orElse(null);
            if (conflict != null) {
                throw new IllegalArgumentException("Id '" + identifiable.id() + "' already exists (in "
                        + conflict + "). Ids must be unique across the whole model.");
            }
        }
        repository.save(identifiable);

        var report = new StringBuilder((existed ? "Updated" : "Created") + " " + typeName
                + " '" + identifiable.id() + "' and persisted the store.");
        var dangling = checkModelUseCase.check().stream()
                .filter(v -> v.elementId().equals(identifiable.id())
                        && v.elementType().equals(type.getSimpleName()))
                .toList();
        if (!dangling.isEmpty()) {
            report.append("\nWarning — it references ids that do not exist (create them or fix the reference):");
            dangling.forEach(v -> report.append("\n- ").append(v));
        }
        return report.toString();
    }

    private String deleteElement(String typeName, String id) {
        var type = registry.classFor(typeName);
        if (repository.findById(id, type).isEmpty()) {
            return "Nothing deleted: no element '" + id + "' of type '" + typeName + "'.";
        }
        repository.deleteAllById(List.of(id), type);

        var report = new StringBuilder("Deleted " + typeName + " '" + id + "' and persisted the store.");
        var nowDangling = checkModelUseCase.check().stream()
                .filter(v -> v.missingId().equals(id))
                .toList();
        if (!nowDangling.isEmpty()) {
            report.append("\nWarning — these elements still reference it (clean them up):");
            nowDangling.forEach(v -> report.append("\n- ").append(v));
        }
        return report.toString();
    }

    private String checkModel() {
        var violations = checkModelUseCase.check();
        if (violations.isEmpty()) {
            return "Model check passed: no dangling references.";
        }
        return violations.size() + " dangling reference(s):\n"
                + violations.stream().map(v -> "- " + v).collect(Collectors.joining("\n"));
    }

    private String lintModel(String severity) {
        var findings = modelLintService.lint();
        if (severity != null) {
            var threshold = LintSeverity.valueOf(severity.toUpperCase(Locale.ROOT));
            findings = findings.stream().filter(f -> f.severity().ordinal() <= threshold.ordinal()).toList();
        }
        if (findings.isEmpty()) {
            return "Lint passed: no findings" + (severity != null ? " at severity " + severity + " or above" : "") + ".";
        }
        var bySeverity = findings.stream()
                .collect(Collectors.groupingBy(LintFinding::severity, java.util.TreeMap::new, Collectors.counting()));
        var summary = bySeverity.entrySet().stream()
                .map(e -> e.getValue() + " " + e.getKey())
                .collect(Collectors.joining(", "));
        return findings.size() + " finding(s) (" + summary + "):\n" + findings.stream()
                .map(f -> "- " + f.severity() + " [" + f.ruleId() + "] " + f.elementType()
                        + " '" + (f.elementName() != null ? f.elementName() : f.elementId()) + "': " + f.message())
                .collect(Collectors.joining("\n"));
    }

    private String listRecipes() {
        return applyRecipeUseCase.catalog().stream()
                .map(r -> "## " + r.id() + " — " + r.name() + "\n" + r.description() + "\nParameters:\n"
                        + r.params().stream()
                                .map(p -> "- " + p.name() + (p.required() ? " (required)" : "") + ": " + p.description())
                                .collect(Collectors.joining("\n")))
                .collect(Collectors.joining("\n\n", "Starter recipes:\n\n", ""));
    }

    private String applyRecipe(String recipeId, JsonNode paramsNode) {
        var params = new java.util.HashMap<String, String>();
        if (paramsNode != null && paramsNode.isObject()) {
            paramsNode.properties().forEach(e -> params.put(e.getKey(), e.getValue().asText()));
        }
        var created = applyRecipeUseCase.handle(recipeId, params);
        return "Recipe '" + recipeId + "' applied; created: " + String.join(", ", created)
                + ". Run lint_model to see what is still open (roles, use cases…).";
    }

    private String proposeImplementations(String projectId, String model, String outputPath) {
        var apiKey = System.getenv("ANTHROPIC_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalArgumentException("ANTHROPIC_API_KEY is not set in the MCP server's environment."
                    + " Add it to the server configuration (env) and reconnect.");
        }
        var written = aiCompleteCodeUseCase.handle(new AiCompleteCodeCommand(projectId, outputPath, null,
                apiKey, model != null && !model.isBlank() ? model : "claude-haiku-4-5-20251001"));
        return "AI proposals written (review each before committing — the developer has the last word):\n"
                + written.stream().map(p -> "- " + p.toAbsolutePath()).collect(Collectors.joining("\n"));
    }

    private String generateCode(String projectId, String outputPath) {
        generateCodeUseCase.handle(new GenerateCodeCommand(projectId, outputPath, null, false));
        return "Code generated for project '" + projectId + "'"
                + (outputPath != null ? " into " + outputPath : " into its stored outputPath") + ".";
    }

    /**
     * Agent-friendly schema rejection: for unknown fields, name the offending class, suggest the
     * closest valid field ("did you mean…?") and list what the class accepts — so the fix takes
     * one turn instead of a round-trip through the full schema.
     */
    private String schemaMismatchMessage(String typeName, JacksonException e) {
        if (e instanceof com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException unrecognized) {
            var unknown = unrecognized.getPropertyName();
            var known = unrecognized.getKnownPropertyIds() == null ? List.<String>of()
                    : unrecognized.getKnownPropertyIds().stream().map(String::valueOf).sorted().toList();
            var target = unrecognized.getReferringClass() != null
                    ? unrecognized.getReferringClass().getSimpleName() : typeName;
            var suggestion = closestField(unknown, known);
            return "Unknown field '" + unknown + "' on " + target
                    + (suggestion != null ? " — did you mean '" + suggestion + "'?" : "")
                    + (known.isEmpty() ? "" : " Valid fields: " + String.join(", ", known) + ".");
        }
        return "The element does not match the '" + typeName + "' schema: " + e.getOriginalMessage()
                + ". Call get_element_schema('" + typeName + "') for the exact shape.";
    }

    /**
     * The closest valid field, or null when nothing is plausibly close. Three signals, in order:
     * containment ("contextMapRelations" → "contextMap"), small edit distance (typos), and a
     * shared camelCase token ("fieldName" → "stateField"); ties resolved by edit distance.
     */
    private static String closestField(String unknown, List<String> known) {
        var unknownLower = unknown.toLowerCase(Locale.ROOT);
        String best = null;
        var bestRank = Integer.MAX_VALUE;
        var bestDistance = Integer.MAX_VALUE;
        for (var candidate : known) {
            var candidateLower = candidate.toLowerCase(Locale.ROOT);
            var distance = editDistance(unknownLower, candidateLower);
            int rank;
            if (candidateLower.contains(unknownLower) || unknownLower.contains(candidateLower)) {
                rank = 0;
            } else if (distance <= Math.max(2, unknown.length() / 3)) {
                rank = 1;
            } else if (sharesToken(unknown, candidate)) {
                rank = 2;
            } else {
                continue;
            }
            if (rank < bestRank || (rank == bestRank && distance < bestDistance)) {
                bestRank = rank;
                bestDistance = distance;
                best = candidate;
            }
        }
        return best;
    }

    /** Do two camelCase names share a meaningful token (e.g. fieldName / stateField → "field")? */
    private static boolean sharesToken(String a, String b) {
        var tokensA = camelTokens(a);
        var tokensB = camelTokens(b);
        tokensA.retainAll(tokensB);
        tokensA.removeIf(token -> token.length() < 3 || "id".equals(token) || "ids".equals(token));
        return !tokensA.isEmpty();
    }

    private static java.util.Set<String> camelTokens(String name) {
        return java.util.Arrays.stream(name.split("(?<=[a-z0-9])(?=[A-Z])|_|-"))
                .map(t -> t.toLowerCase(Locale.ROOT))
                .collect(Collectors.toCollection(java.util.HashSet::new));
    }

    private static int editDistance(String a, String b) {
        var previous = new int[b.length() + 1];
        for (var j = 0; j <= b.length(); j++) {
            previous[j] = j;
        }
        for (var i = 1; i <= a.length(); i++) {
            var current = new int[b.length() + 1];
            current[0] = i;
            for (var j = 1; j <= b.length(); j++) {
                var substitution = previous[j - 1] + (a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1);
                current[j] = Math.min(substitution, Math.min(previous[j] + 1, current[j - 1] + 1));
            }
            previous = current;
        }
        return previous[b.length()];
    }

    private String nameOf(Object element) {
        try {
            var value = element.getClass().getMethod("name").invoke(element);
            return value != null ? value.toString() : null;
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }

    private static String requireText(JsonNode args, String field) {
        if (args == null || !args.hasNonNull(field) || args.get(field).asText().isBlank()) {
            throw new IllegalArgumentException("Missing required argument '" + field + "'.");
        }
        return args.get(field).asText();
    }

    private static Map<String, Object> obj(Map<String, Object> properties, List<String> required) {
        var schema = new LinkedHashMap<String, Object>();
        schema.put("type", "object");
        schema.put("properties", properties);
        if (!required.isEmpty()) {
            schema.put("required", required);
        }
        return schema;
    }

    private static Map<String, Object> str(String description) {
        return Map.of("type", "string", "description", description);
    }


    // ---- system/solutions workspace ------------------------------------------

    private String workspaceStatus() throws Exception {
        var diff = diffService.diffAgainstSystem();
        return yamlOf(Map.of(
                "current", workspace.currentBranch(),
                "system", workspace.onSystem(),
                "solutions", workspace.solutionBranches(),
                "diff", Map.of("added", diff.added(), "modified", diff.modified(),
                        "removed", diff.removed())));
    }

    private java.util.Map<String, String> resolutions(JsonNode args) {
        var map = new java.util.LinkedHashMap<String, String>();
        if (args != null && args.hasNonNull("resolutions")) {
            args.get("resolutions").properties()
                    .forEach(e -> map.put(e.getKey(), e.getValue().asText()));
        }
        return map;
    }

    private String yamlOf(Object value) throws Exception {
        return yaml.writeValueAsString(value);
    }
}
