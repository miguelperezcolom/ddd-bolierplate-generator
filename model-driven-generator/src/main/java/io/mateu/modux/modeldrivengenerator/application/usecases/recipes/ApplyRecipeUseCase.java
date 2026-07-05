package io.mateu.modux.modeldrivengenerator.application.usecases.recipes;

import io.mateu.modux.modeldrivengenerator.application.usecases.recipes.Recipe.RecipeParam;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * The built-in starter recipes. Each recipe emits one or two intent-layer elements — the
 * generator's expanders ({@code FlowExpander}, {@code ProcessExpander}) derive the structure at
 * generation time, and the linter guides the author through whatever is still missing (roles,
 * use cases…). That is the whole point: start from a 5-line intent, not from 6 structural pieces.
 */
@Service
@RequiredArgsConstructor
public class ApplyRecipeUseCase {

    private final CommonFileRepository repository;
    private final ElementTypeRegistry registry;

    public List<Recipe> catalog() {
        return List.of(
                new Recipe("materialized-read-model", "Read model kept by a projection",
                        "An event in a source context materializes a denormalized read model in a "
                                + "target context. Emits one MATERIALIZES flow; the projection, "
                                + "subscription and read model are derived at generation time.",
                        List.of(
                                new RecipeParam("id", "Id of the new flow (kebab-case)", true),
                                new RecipeParam("name", "Display name", true),
                                new RecipeParam("triggerAggregateId", "Source aggregate emitting the event", true),
                                new RecipeParam("triggerEvent", "Domain event name (e.g. ReservaCreada)", true),
                                new RecipeParam("targetModuleId", "Module that owns the read model", true),
                                new RecipeParam("readModelName", "Name of the materialized read model", true),
                                new RecipeParam("materializedFields", "Comma-separated fields to materialize", false))),
                new Recipe("human-approval-process", "Process with a human approval step",
                        "A long-running process started by a domain event: a human approves (with "
                                + "deadline and escalation), then an automated step applies the outcome. "
                                + "Emits one Process; saga, worklist and deadline watchers are derived.",
                        List.of(
                                new RecipeParam("id", "Id of the new process (kebab-case)", true),
                                new RecipeParam("name", "Display name", true),
                                new RecipeParam("triggerAggregateId", "Aggregate whose event starts the process", true),
                                new RecipeParam("triggerEvent", "Domain event name that starts the process", true),
                                new RecipeParam("ownerModuleId", "Module that owns the process", true),
                                new RecipeParam("approverRoleId", "Role that approves (linted if missing)", false),
                                new RecipeParam("deadline", "Approval deadline, ISO-8601 (default PT48H)", false),
                                new RecipeParam("escalationRoleId", "Role escalated to on deadline", false),
                                new RecipeParam("applyUseCaseId", "Use case that applies the approved outcome", false))),
                new Recipe("external-notification", "Notify an external system on an event",
                        "An event notifies an external system through a gateway/outbound adapter. "
                                + "Emits one NOTIFIES flow; the subscription and the outbound call are derived.",
                        List.of(
                                new RecipeParam("id", "Id of the new flow (kebab-case)", true),
                                new RecipeParam("name", "Display name", true),
                                new RecipeParam("triggerAggregateId", "Source aggregate emitting the event", true),
                                new RecipeParam("triggerEvent", "Domain event name", true),
                                new RecipeParam("targetModuleId", "Module that owns the outbound adapter", true))));
    }

    /** Applies a recipe; returns the ids of the created elements. */
    public List<String> handle(String recipeId, Map<String, String> params) {
        var recipe = catalog().stream().filter(r -> r.id().equals(recipeId)).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown recipe '" + recipeId + "'. Available: "
                        + catalog().stream().map(Recipe::id).toList()));
        var missing = recipe.params().stream()
                .filter(RecipeParam::required)
                .map(RecipeParam::name)
                .filter(name -> isBlank(params.get(name)))
                .toList();
        if (!missing.isEmpty()) {
            throw new IllegalArgumentException("Recipe '" + recipeId + "' is missing required parameter(s): "
                    + String.join(", ", missing));
        }
        assertNewId(params.get("id"));
        return switch (recipeId) {
            case "materialized-read-model" -> materializedReadModel(params);
            case "human-approval-process" -> humanApprovalProcess(params);
            case "external-notification" -> externalNotification(params);
            default -> throw new IllegalStateException("Recipe '" + recipeId + "' has no implementation");
        };
    }

    private List<String> materializedReadModel(Map<String, String> p) {
        var fields = isBlank(p.get("materializedFields")) ? List.<String>of()
                : Arrays.stream(p.get("materializedFields").split(",")).map(String::trim).toList();
        repository.save(new FlowEntity(p.get("id"), p.get("name"),
                "Materializes " + p.get("readModelName") + " from " + p.get("triggerEvent"),
                FlowArchetype.MATERIALIZES, p.get("triggerAggregateId"), p.get("triggerEvent"),
                p.get("targetModuleId"), p.get("readModelName"), fields, null, List.of(), List.of()));
        return List.of(p.get("id"));
    }

    private List<String> humanApprovalProcess(Map<String, String> p) {
        var steps = new ArrayList<ProcessStepEntity>();
        steps.add(new ProcessStepEntity(p.get("id") + "-approve", "Approve", ProcessStepType.HUMAN,
                null, blankToNull(p.get("approverRoleId")),
                isBlank(p.get("deadline")) ? "PT48H" : p.get("deadline"),
                blankToNull(p.get("escalationRoleId")), null,
                "Human approval of the " + p.get("triggerEvent") + " outcome"));
        steps.add(new ProcessStepEntity(p.get("id") + "-apply", "Apply outcome", ProcessStepType.AUTOMATED,
                blankToNull(p.get("applyUseCaseId")), null, null, null, null,
                "Applies the approved outcome"));
        repository.save(new ProcessEntity(p.get("id"), p.get("name"),
                "Approval process started by " + p.get("triggerEvent"),
                p.get("triggerAggregateId"), p.get("triggerEvent"), p.get("ownerModuleId"),
                steps, p.get("name").replaceAll("\\s", "") + "Completed", null));
        return List.of(p.get("id"));
    }

    private List<String> externalNotification(Map<String, String> p) {
        repository.save(new FlowEntity(p.get("id"), p.get("name"),
                "Notifies an external system on " + p.get("triggerEvent"),
                FlowArchetype.NOTIFIES, p.get("triggerAggregateId"), p.get("triggerEvent"),
                p.get("targetModuleId"), null, List.of(), null, List.of(), List.of()));
        return List.of(p.get("id"));
    }

    private void assertNewId(String id) {
        for (var entry : registry.all().entrySet()) {
            if (repository.findById(id, entry.getValue()).isPresent()) {
                throw new IllegalArgumentException("Id '" + id + "' already exists (in " + entry.getKey()
                        + "). Pick a new id for the recipe's element.");
            }
        }
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }

    private static String blankToNull(String value) {
        return isBlank(value) ? null : value;
    }
}
