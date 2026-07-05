package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The generated schema must encode the authoring rules, not just the structure: ids required,
 * id-shaped fields patterned, references and store sections documented — that is what turns IDE
 * autocomplete into actual validation while typing.
 */
class ModelJsonSchemaGeneratorTest {

    final ModelJsonSchemaGenerator generator = new ModelJsonSchemaGenerator();

    @Test
    void id_is_required_wherever_it_exists() {
        var schema = generator.fullSchema();

        var aggregate = defs(schema).get("AggregateEntity");
        assertTrue(contains(aggregate.get("required"), "id"), aggregate.toString());
        // nested elements too
        var operation = defs(schema).get("OperationEntity");
        assertTrue(contains(operation.get("required"), "id"), operation.toString());
    }

    @Test
    void id_shaped_fields_carry_the_id_pattern() {
        var schema = generator.fullSchema();
        var aggregate = defs(schema).get("AggregateEntity");

        assertEquals(ModelJsonSchemaGenerator.ID_PATTERN,
                aggregate.at("/properties/id/pattern").asText());
        assertEquals(ModelJsonSchemaGenerator.ID_PATTERN,
                aggregate.at("/properties/modelId/pattern").asText());
        // list references are patterned on the items
        assertEquals(ModelJsonSchemaGenerator.ID_PATTERN,
                aggregate.at("/properties/decisionIds/items/pattern").asText());
        // non-id strings stay unconstrained
        assertTrue(aggregate.at("/properties/tableName/pattern").isMissingNode());
    }

    @Test
    void references_and_store_sections_are_documented() {
        var schema = generator.fullSchema();

        var aggregate = defs(schema).get("AggregateEntity");
        assertTrue(aggregate.at("/properties/modelId/description").asText().contains("Reference to an existing"),
                aggregate.at("/properties/modelId").toString());
        assertFalse(schema.at("/properties/aggregates/description").asText().isBlank(),
                "top-level store sections should have hover docs");
    }

    @Test
    void per_type_schema_is_available_for_mcp() {
        var schema = generator.schemaFor(AggregateEntity.class);
        assertTrue(schema.toString().contains("eventSourcingEnabled"));
    }

    private static JsonNode defs(JsonNode schema) {
        var defs = schema.get("$defs");
        assertTrue(defs != null && defs.has("AggregateEntity"),
                "expected $defs with AggregateEntity, got: " + (defs == null ? "null" : defs.fieldNames().next()));
        return defs;
    }

    private static boolean contains(JsonNode array, String value) {
        if (array == null || !array.isArray()) {
            return false;
        }
        for (var item : array) {
            if (value.equals(item.asText())) {
                return true;
            }
        }
        return false;
    }
}
