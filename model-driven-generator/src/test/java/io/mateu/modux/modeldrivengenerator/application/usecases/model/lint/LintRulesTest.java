package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.PiiClassification;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.KpiMeasure;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.KpiTimeGrain;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.KpiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.LifecycleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.LifecycleTransitionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.uidl.data.FieldDataType;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class LintRulesTest {

    @Test
    void lifecycle_rule_flags_unknown_endpoints_and_unreachable_states() {
        var lifecycle = new LifecycleEntity("status", "pending",
                List.of("pending", "confirmed", "orphan"),
                List.of(new LifecycleTransitionEntity("t1", "pending", "confirmed", null, null, null),
                        new LifecycleTransitionEntity("t2", "pending", "ghost", null, null, null)));
        var aggregate = new AggregateEntity("a1", "Booking", null, null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), lifecycle, false);

        var findings = new LintRules.LifecycleCoherence().apply(snapshotWith(aggregate));

        // t2 → ghost unknown, orphan unreachable from pending
        assertTrue(findings.stream().anyMatch(f -> f.message().contains("unknown state 'ghost'")));
        assertTrue(findings.stream().anyMatch(f -> f.message().contains("'orphan' is unreachable")));
    }

    @Test
    void lifecycle_rule_flags_an_initial_state_that_is_not_declared() {
        var lifecycle = new LifecycleEntity("status", "draft",
                List.of("pending", "confirmed"),
                List.of(new LifecycleTransitionEntity("t1", "pending", "confirmed", null, null, null)));
        var aggregate = new AggregateEntity("a1", "Booking", null, null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), lifecycle, false);

        var findings = new LintRules.LifecycleCoherence().apply(snapshotWith(aggregate));

        assertTrue(findings.stream().anyMatch(f -> f.severity() == LintSeverity.ERROR
                && f.message().contains("Initial state 'draft'")));
    }

    @Test
    void pii_cross_context_flags_flows_materializing_pii_fields() {
        var model = new ModelEntity("m1", "Reserva", List.of(
                field("titular", PiiClassification.PII),
                field("localizador", null)), List.of());
        var aggregate = new AggregateEntity("a1", "Reserva", "m1", null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), null, false);
        var flow = new FlowEntity("f1", "ReservaVisible", null,
                io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype.MATERIALIZES,
                "a1", "ReservaCreada", "mod-b", "RM", List.of("titular", "localizador"),
                null, List.of(), List.of());

        var snapshot = new ModelSnapshot(null, null, null, List.of(aggregate), List.of(model),
                null, null, null, null, null, null, null, List.of(flow), null, null, null, null, null, null);
        var findings = new LintRules.PiiCrossContext().apply(snapshot);

        assertEquals(1, findings.size());
        assertTrue(findings.get(0).message().contains("titular"));
    }

    @Test
    void kpi_rule_requires_value_field_for_non_count_measures() {
        var kpiOk = new KpiEntity("k1", "CheckIns", null, "evt-1", KpiMeasure.COUNT, null,
                List.of("hotelId"), KpiTimeGrain.DAY);
        var kpiBad = new KpiEntity("k2", "RevPar", null, "evt-2", KpiMeasure.AVG, null,
                List.of("hotelId"), KpiTimeGrain.DAY);
        var module = module("mod1", List.of(kpiOk, kpiBad));

        var findings = new LintRules.KpiValueField().apply(snapshotWith(module));

        assertEquals(1, findings.size());
        assertTrue(findings.get(0).message().contains("RevPar"));
        assertEquals(LintSeverity.ERROR, findings.get(0).severity());
    }

    @Test
    void process_rules_flag_missing_role_and_missing_escalation() {
        var process = new ProcessEntity("p1", "CheckIn", null, "a1", "Evt", "mod1",
                List.of(new ProcessStepEntity("s1", "Verificar", ProcessStepType.HUMAN,
                                null, null, "PT2H", null, null, null)),
                null, null);
        var snapshot = new ModelSnapshot(null, null, null, null, null, null, null, null,
                null, null, null, null, null, List.of(process), null, null, null, null, null);

        assertEquals(1, new LintRules.ProcessHumanRole().apply(snapshot).size());
        assertEquals(1, new LintRules.ProcessDeadlineEscalation().apply(snapshot).size());
    }

    @Test
    void audited_without_event_sourcing_is_advice_only() {
        var aggregate = new AggregateEntity("a1", "Folio", null, null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), null, true);

        var findings = new LintRules.AuditedEventSourcing().apply(snapshotWith(aggregate));

        assertEquals(1, findings.size());
        assertEquals(LintSeverity.INFO, findings.get(0).severity());
    }

    @Test
    void proposed_decisions_surface_as_open_points() {
        var open = new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity(
                "d-hold", "¿Hold de cupo?", "¿Hace falta bloquear cupo antes del book?",
                null, io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus.PROPOSED, null);
        var resolved = new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity(
                "d-outbox", "Outbox siempre", "Eventos por outbox",
                null, io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus.ACCEPTED, null);
        var snapshot = new ModelSnapshot(null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, List.of(open, resolved), null, null, null, null);

        var findings = new LintRules.OpenDecisions().apply(snapshot);

        assertEquals(1, findings.size());
        assertEquals("d-hold", findings.get(0).elementId());
        assertEquals(LintSeverity.INFO, findings.get(0).severity());
    }

    @Test
    void reaching_into_a_foreign_aggregate_is_flagged_api_or_projection_expected() {
        var step = new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity(
                "s1", "leerReserva",
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.ReadAggregate,
                "agg-reserva", null, null, null, null, null, null);
        var useCase = new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity(
                "uc-checkin", "RealizarCheckin", false, false, false, false, true,
                null, null, List.of(step), List.of(), List.of(), null, null, null, null,
                null, null, null, null, null, false, null, null, null, false, null, false, null, null, null);
        var reservas = new ModuleEntity("mod-reservas", "Reservas", null, List.of("agg-reserva"),
                null, null, null, null, null, null, null, null, null, null, null, null, false,
                null, null, null, null, null);
        var frontoffice = new ModuleEntity("mod-frontoffice", "FrontOffice", null, List.of(),
                null, null, List.of("uc-checkin"), null, null, null, null, null, null, null, null, null, false,
                null, null, null, null, null);
        var snapshot = new ModelSnapshot(null, null, List.of(reservas, frontoffice), null, null,
                List.of(useCase), null, null, null, null, null, null, null, null, null, null, null, null, null);

        var findings = new LintRules.CrossContextDataAccess().apply(snapshot);

        assertEquals(1, findings.size());
        assertEquals(LintSeverity.WARNING, findings.get(0).severity());
        assertTrue(findings.get(0).message().contains("query service"));
        assertTrue(findings.get(0).message().contains("MATERIALIZES"));
    }

    @Test
    void clean_model_produces_no_findings_from_the_concept_rules() {
        var snapshot = ModelSnapshot.empty();
        for (var rule : LintRules.all()) {
            assertTrue(rule.apply(snapshot).isEmpty(), "rule " + rule.id() + " found issues in an empty model");
        }
    }

    // --- helpers ---

    private static ModelSnapshot snapshotWith(AggregateEntity aggregate) {
        return new ModelSnapshot(null, null, null, List.of(aggregate), null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null);
    }

    private static ModelSnapshot snapshotWith(ModuleEntity module) {
        return new ModelSnapshot(null, null, List.of(module), null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null);
    }

    private static ModuleEntity module(String id, List<KpiEntity> kpis) {
        return new ModuleEntity(id, id, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, false, null, null, null, null, null,
                null, List.of(), kpis);
    }

    private static ModelFieldEntity field(String name, PiiClassification pii) {
        return new ModelFieldEntity(name, name, true, FieldDataType.string, null, false, null,
                List.of(), pii, null);
    }
}
