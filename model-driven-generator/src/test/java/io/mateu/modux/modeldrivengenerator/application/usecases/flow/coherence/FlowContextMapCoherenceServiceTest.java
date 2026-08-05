package io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class FlowContextMapCoherenceServiceTest {

    private static final List<BoundedContextEntity> BOUNDED_CONTEXTS = List.of(
            mod("mod-reservas", "Reservas", List.of("agg-reserva")),
            mod("mod-frontoffice", "FrontOffice", List.of("agg-estancia")));

    private static final List<AggregateEntity> AGGREGATES = List.of(
            agg("agg-reserva"), agg("agg-estancia"));

    @Test
    void flags_a_cross_context_flow_with_no_declared_relation_and_suggests_a_type() {
        var flow = flow("f1", "ReservaVisibleEnFrontOffice", FlowArchetype.MATERIALIZES,
                "agg-reserva", "mod-frontoffice");

        var finding = analyzeOne(flow, List.of()); // no relations declared

        assertEquals(FlowContextMapFinding.Status.MISSING_RELATION, finding.status());
        assertEquals(ContextMapRelationType.OPEN_HOST_SERVICE, finding.suggestedType());
        assertEquals("mod-reservas", finding.sourceBoundedContextId());
        assertEquals("mod-frontoffice", finding.targetBoundedContextId());
    }

    @Test
    void ok_when_a_forward_relation_backs_the_flow() {
        var flow = flow("f1", "ReservaCreaEstancia", FlowArchetype.TRIGGERS,
                "agg-reserva", "mod-frontoffice");
        var relation = rel("mod-reservas", "mod-frontoffice", "CUSTOMER_SUPPLIER");

        var finding = analyzeOne(flow, List.of(relation));

        assertEquals(FlowContextMapFinding.Status.OK, finding.status());
        assertEquals(ContextMapRelationType.CUSTOMER_SUPPLIER, finding.declaredType());
        assertNull(finding.suggestedType());
    }

    @Test
    void reversed_when_the_relation_points_the_opposite_way() {
        var flow = flow("f1", "ReservaCreaEstancia", FlowArchetype.TRIGGERS,
                "agg-reserva", "mod-frontoffice");
        var relation = rel("mod-frontoffice", "mod-reservas", "CUSTOMER_SUPPLIER");

        var finding = analyzeOne(flow, List.of(relation));

        assertEquals(FlowContextMapFinding.Status.REVERSED, finding.status());
    }

    @Test
    void internal_when_source_and_target_are_the_same_context() {
        var flow = flow("f1", "InternoReservas", FlowArchetype.MATERIALIZES,
                "agg-reserva", "mod-reservas");

        var finding = analyzeOne(flow, List.of());

        assertEquals(FlowContextMapFinding.Status.INTERNAL, finding.status());
    }

    @Test
    void external_when_the_archetype_notifies_an_outside_system() {
        var flow = flow("f1", "AvisarPasarela", FlowArchetype.NOTIFIES,
                "agg-reserva", "mod-frontoffice");

        var finding = analyzeOne(flow, List.of());

        assertEquals(FlowContextMapFinding.Status.EXTERNAL, finding.status());
        assertNull(finding.suggestedType());
    }

    // --- helpers ---

    private static FlowContextMapFinding analyzeOne(FlowEntity flow, List<ContextMapRelationEntity> relations) {
        var findings = FlowContextMapCoherenceService.analyze(
                List.of(flow), AGGREGATES, BOUNDED_CONTEXTS, relations);
        return findings.get(0);
    }

    // --- compact factories so the records' long arg lists don't drown the test ---

    private static FlowEntity flow(String id, String name, FlowArchetype archetype,
                                   String triggerAggregateId, String targetBoundedContextId) {
        return new FlowEntity(id, name, null, archetype, triggerAggregateId, "SomeEvent",
                targetBoundedContextId, null, List.of(), null, List.of(), List.of());
    }

    private static ContextMapRelationEntity rel(String source, String target, String type) {
        return new ContextMapRelationEntity("rel-" + source + "-" + target, source + "→" + target,
                source, target, type, null);
    }

    private static AggregateEntity agg(String id) {
        return new AggregateEntity(id, id, null, null, null, null, null, false, false, null, null, null, null);
    }

    private static BoundedContextEntity mod(String id, String name, List<String> aggregateIds) {
        return new BoundedContextEntity(id, name, null, aggregateIds, null, null, null, null, null, null, null, null,
                null, null, null, null, false, null, null, null, null, null);
    }

}
