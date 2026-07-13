package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.victools.jsonschema.generator.Option;
import com.github.victools.jsonschema.generator.OptionPreset;
import com.github.victools.jsonschema.generator.SchemaGenerator;
import com.github.victools.jsonschema.generator.SchemaGeneratorConfigBuilder;
import com.github.victools.jsonschema.generator.SchemaVersion;
import com.github.victools.jsonschema.module.jackson.JacksonModule;
import org.springframework.stereotype.Service;

/**
 * Generates the JSON schema for the model store (or any single element type). The schema powers
 * IDE autocomplete/validation on the YAML store ({@code # yaml-language-server: $schema=...}) and
 * the MCP {@code get_element_schema} tool, so both humans and agents author against one contract.
 *
 * <p>Beyond the raw structure, the schema encodes the authoring rules that used to live only in
 * the linter's head: {@code id} is required wherever it exists, id-shaped fields ({@code id},
 * {@code *Id}, {@code *Ids}) carry a pattern that rejects whitespace and exotic characters, and
 * reference fields are documented as such — so most mistakes surface while typing, not at
 * generation time.
 */
@Service
public class ModelJsonSchemaGenerator {

    /** What an id may look like: no spaces/quotes; kebab-case recommended, legacy camel/UPPER kept valid. */
    static final String ID_PATTERN = "^[A-Za-z0-9][A-Za-z0-9._-]*$";

    private final SchemaGenerator generator;

    public ModelJsonSchemaGenerator() {
        var configBuilder = new SchemaGeneratorConfigBuilder(
                SchemaVersion.DRAFT_2020_12, OptionPreset.PLAIN_JSON)
                .with(new JacksonModule())
                .with(Option.FORBIDDEN_ADDITIONAL_PROPERTIES_BY_DEFAULT)
                .with(Option.DEFINITIONS_FOR_ALL_OBJECTS);
        // id is required exactly where the element is addressable (Identifiable); field-like
        // records (e.g. ModelFieldEntity) are name-identified and legitimately omit it
        configBuilder.forFields()
                .withRequiredCheck(field -> !field.isFakeContainerItemScope()
                        && "id".equals(field.getName())
                        && io.mateu.uidl.interfaces.Identifiable.class
                                .isAssignableFrom(field.getDeclaringType().getErasedType()))
                .withStringPatternResolver(field -> {
                    if (!field.getType().getErasedType().equals(String.class)) {
                        return null;
                    }
                    var name = field.getName();
                    return "id".equals(name) || name.endsWith("Id") || name.endsWith("Ids")
                            ? ID_PATTERN : null;
                })
                .withDescriptionResolver(ModelJsonSchemaGenerator::describe);
        generator = new SchemaGenerator(configBuilder.build());
    }

    private static String describe(com.github.victools.jsonschema.generator.FieldScope field) {
        if (field.isFakeContainerItemScope()) {
            return null;
        }
        var name = field.getName();
        if (field.getDeclaringType().getErasedType().equals(AllData.class)) {
            return STORE_SECTIONS.get(name);
        }
        if ("id".equals(name)) {
            return "Unique id of this element in the model; other elements reference it via *Id fields. "
                    + "No spaces (kebab-case recommended).";
        }
        if (name.endsWith("Ids") && name.length() > 3) {
            return "References to existing " + referenceTarget(name.substring(0, name.length() - 3))
                    + " ids (referential integrity is checked by the linter).";
        }
        if (name.endsWith("Id") && name.length() > 2) {
            return "Reference to an existing " + referenceTarget(name.substring(0, name.length() - 2))
                    + " id (referential integrity is checked by the linter).";
        }
        return null;
    }

    private static String referenceTarget(String base) {
        return "'" + base + "'";
    }

    /** One-line hover docs for the top-level sections of the store. */
    private static final java.util.Map<String, String> STORE_SECTIONS = java.util.Map.ofEntries(
            java.util.Map.entry("projects", "Deliverable systems: output path, package, services, tenancy, external systems, context map."),
            java.util.Map.entry("services", "Microservices of a project; each deploys modules (the buildable units of the bounded contexts)."),
            java.util.Map.entry("boundedContexts", "Bounded contexts: the unit that owns aggregates, use cases and the published language."),
            java.util.Map.entry("modules", "Buildable units of a bounded context: every context is born with its MAIN module (undistributed elements live there); services deploy modules."),
            java.util.Map.entry("aggregates", "DDD aggregate roots: operations, invariants, lifecycle, persistence and event sourcing."),
            java.util.Map.entry("entities", "Domain entities that live inside an aggregate boundary."),
            java.util.Map.entry("valueObjects", "Immutable typed wrappers (e.g. BookingId, Email) used by models and aggregates."),
            java.util.Map.entry("invariants", "Reusable invariant definitions referenced by aggregates."),
            java.util.Map.entry("domainEvents", "Events emitted by aggregates inside the bounded context."),
            java.util.Map.entry("useCases", "Application services: the commands/queries the system exposes."),
            java.util.Map.entry("models", "Data shapes (fields + validations) backing aggregates, DTOs and read models."),
            java.util.Map.entry("gateways", "Outbound ports to external services, with circuit breakers and rate limits."),
            java.util.Map.entry("modelMappings", "Field-level mappings between models (e.g. DTO ↔ domain)."),
            java.util.Map.entry("sagas", "Multi-step workflows with compensation (orchestration or choreography)."),
            java.util.Map.entry("projections", "Event handlers that maintain denormalized read models."),
            java.util.Map.entry("subscriptions", "Message handlers with filtering, retry and DLQ policies."),
            java.util.Map.entry("scheduledTriggers", "Cron-based tasks that invoke use cases."),
            java.util.Map.entry("businessRules", "Declarative condition/action rules evaluated by the runtime."),
            java.util.Map.entry("roles", "RBAC role definitions."),
            java.util.Map.entry("pages", "UI pages (CRUD, wizards) generated for the application."),
            java.util.Map.entry("uiAdapters", "Bindings between pages and use cases."),
            java.util.Map.entry("uiShells", "Application shells: menus aggregating pages across bounded contexts."),
            java.util.Map.entry("components", "Reusable UI components."),
            java.util.Map.entry("bddScenarios", "Given/when/then scenarios attached to use cases."),
            java.util.Map.entry("enums", "Enumerated types shared by models."),
            java.util.Map.entry("queryServices", "Read-side services exposing query operations."),
            java.util.Map.entry("integrationEvents", "Events published across context boundaries (with DLQ/versioning concerns)."),
            java.util.Map.entry("readModels", "Denormalized views kept by projections."),
            java.util.Map.entry("flows", "Intent layer: one line of intent (materializes/triggers/notifies/orchestrates) expanded into structure."),
            java.util.Map.entry("processes", "Intent layer: human/automated step lists expanded into sagas, worklists and deadlines."),
            java.util.Map.entry("decisions", "Architecture decision records (ADRs); elements trace to them via decisionIds."),
            java.util.Map.entry("views", "Named slices of the model for focused work and partial generation."),
            java.util.Map.entry("journeys", "Trayectos: named paths through the landscape — DAGs of hops (legs) over existing elements, riding on declared dependencies. A reading layer, never a second topology."));

    /** Schema for a single element type (e.g. {@link AggregateEntity}). */
    public JsonNode schemaFor(Class<?> type) {
        return generator.generateSchema(type);
    }

    /** Schema for the whole store. */
    public JsonNode fullSchema() {
        return schemaFor(AllData.class);
    }
}
