package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import java.util.List;
import org.junit.jupiter.api.Test;

/**
 * Phase 1 of {@code docs/design/operation-body.md}: an operation carries a modeled {@code steps}
 * body, the schema exposes it, and the legacy {@code preconditions}/{@code sets}/{@code emits}
 * strings desugar into steps without loss.
 */
class OperationBodyTest {

    final ModelJsonSchemaGenerator generator = new ModelJsonSchemaGenerator();

    // --- desugar (migration §7) --------------------------------------------------------------

    @Test
    void modeled_steps_win_over_legacy_fields() {
        var modeled = List.of(stepOf("s1", UseCaseStepType.PublishDomainEvent));
        var op = withSteps(legacy("op-x", "pending", "state", "Confirmed"), modeled);

        assertTrue(OperationBodyDesugar.hasModeledBody(op));
        assertEquals(modeled, OperationBodyDesugar.effectiveSteps(op));
    }

    @Test
    void legacy_fields_desugar_in_precondition_set_emit_order() {
        var op = legacy("op-confirm", "estaPendiente", "estado", "ReservaConfirmada");

        var steps = OperationBodyDesugar.effectiveSteps(op);

        assertEquals(3, steps.size());
        assertEquals(UseCaseStepType.CheckPrecondition, steps.get(0).type());
        assertEquals("estaPendiente", steps.get(0).condition());
        assertEquals(UseCaseStepType.SetField, steps.get(1).type());
        assertEquals("estado", steps.get(1).fieldName());
        assertEquals(UseCaseStepType.PublishDomainEvent, steps.get(2).type());
        // emitted events stay unresolved to an id — a catalog-aware linter concern (§6)
        assertEquals("ReservaConfirmada", steps.get(2).intent());
    }

    @Test
    void multiple_tokens_split_on_separators() {
        var op = legacy("op-multi", "a; b\nc", null, "E1, E2");

        var steps = OperationBodyDesugar.effectiveSteps(op);

        assertEquals(List.of("a", "b", "c"),
                steps.stream().filter(s -> s.type() == UseCaseStepType.CheckPrecondition)
                        .map(OperationStepEntity::condition).toList());
        assertEquals(2, steps.stream().filter(s -> s.type() == UseCaseStepType.PublishDomainEvent).count());
    }

    @Test
    void empty_operation_desugars_to_no_steps() {
        var op = legacy("op-empty", null, "  ", "");
        assertTrue(OperationBodyDesugar.effectiveSteps(op).isEmpty());
    }

    // --- schema (the metamodel exposes the body) ---------------------------------------------

    @Test
    void schema_exposes_operation_steps_and_control_flow() {
        var schema = generator.fullSchema();
        var defs = schema.at("/$defs").isMissingNode() ? schema.at("/definitions") : schema.at("/$defs");

        assertFalse(defs.at("/OperationEntity/properties/steps").isMissingNode(),
                "OperationEntity must expose a modeled steps body");
        var step = defs.get("OperationStepEntity");
        assertFalse(step.isMissingNode(), "OperationStepEntity must be a schema definition");
        // control flow nests child steps, persisted under then/else/body
        assertFalse(step.at("/properties/then").isMissingNode());
        assertFalse(step.at("/properties/else").isMissingNode(), "reserved word persisted as 'else'");
        assertFalse(step.at("/properties/body").isMissingNode());
    }

    @Test
    void schema_step_type_enum_includes_the_new_vocabulary() {
        var schema = generator.fullSchema();
        var defs = schema.at("/$defs").isMissingNode() ? schema.at("/definitions") : schema.at("/$defs");
        var values = defs.at("/UseCaseStepType/enum").toString();

        for (var added : List.of("CheckPrecondition", "SetField", "CallDomainService", "If", "ForEach")) {
            assertTrue(values.contains(added), "step vocabulary must include " + added + ": " + values);
        }
    }

    // --- helpers -----------------------------------------------------------------------------

    private static OperationStepEntity stepOf(String id, UseCaseStepType type) {
        return new OperationStepEntity(id, id, type, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    private static OperationEntity legacy(String id, String preconditions, String sets, String emits) {
        return new OperationEntity(id, id, null, null, preconditions, sets, emits,
                "Custom", false, null, null, null, null);
    }

    private static OperationEntity withSteps(OperationEntity op, List<OperationStepEntity> steps) {
        return new OperationEntity(op.id(), op.name(), op.inputModelId(), op.outputModelId(),
                op.preconditions(), op.sets(), op.emits(), op.type(), op.paginated(),
                op.defaultPageSize(), op.intent(), op.description(), steps);
    }
}
