package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowName;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.uidl.data.FieldDataType;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

class FlowExpansionContextResolverTest {

    @Test
    void resolves_chain_and_field_types_from_the_model() {
        var flow = Flow.of(
                new FlowId("f1"), new FlowName("ReservaVisibleEnFrontOffice"), null,
                FlowArchetype.MATERIALIZES,
                "agg-reserva", "ReservaCreada", "frontoffice",
                "ReservaFrontOffice", List.of("localizador", "titular"), null, List.of(), List.of());

        var ctx = FlowExpansionContextResolver.resolve(flow,
                List.of(agg("agg-reserva", "Reserva", "model-reserva")),
                List.of(mod("mod-reservas", "reservas", List.of("agg-reserva")),
                        mod("frontoffice", "FrontOffice", List.of())),
                List.of(svc("svc-reservas", "reservas", List.of("mod-reservas-main"))),
                List.of(mainModule("mod-reservas"), mainModule("frontoffice")),
                List.of(proj("proj-hotel", "hotel", List.of("svc-reservas"))),
                List.of(model("model-reserva",
                        field("localizador", FieldDataType.string),
                        field("titular", FieldDataType.string),
                        field("importe", FieldDataType.money))),
                List.of());

        assertEquals("hotel", ctx.projectName());
        assertEquals("reservas", ctx.sourceServiceName());
        assertEquals("Reserva", ctx.aggregateName());
        assertEquals("FrontOffice", ctx.targetBoundedContextName());
        assertEquals(FieldDataType.string, ctx.typeOf("localizador"));
        assertEquals(FieldDataType.string, ctx.typeOf("titular"));
        // only the materialized fields are carried, not the whole model
        assertFalse(ctx.fieldTypes().containsKey("importe"));
    }

    @Test
    void falls_back_gracefully_when_references_are_missing() {
        var flow = Flow.of(
                new FlowId("f2"), new FlowName("Orphan"), null, FlowArchetype.MATERIALIZES,
                "missing-agg", "Something", "missing-boundedContext",
                "X", List.of("a"), null, List.of(), List.of());

        var ctx = FlowExpansionContextResolver.resolve(flow,
                List.of(), List.of(), List.of(), List.of(), List.of(), List.of(), List.of());

        assertEquals("app", ctx.projectName());
        assertEquals("missing-agg", ctx.aggregateName());
        assertEquals("missing-boundedContext", ctx.targetBoundedContextName());
    }

    // --- compact factories so the records' long arg lists don't drown the test ---

    private static AggregateEntity agg(String id, String name, String modelId) {
        return new AggregateEntity(id, name, modelId, null, null, null, null, false, false, null, null, null, null);
    }

    private static BoundedContextEntity mod(String id, String name, List<String> aggregateIds) {
        return new BoundedContextEntity(id, name, null, aggregateIds, null, null, null, null, null, null, null, null,
                null, null, null, null, false, null, null, null, null, null);
    }

    private static ServiceEntity svc(String id, String name, List<String> moduleIds) {
        return ServiceEntity.builder().id(id).name(name).moduleIds(moduleIds).build();
    }

    private static io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity mainModule(String boundedContextId) {
        return io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity.builder()
                .id(boundedContextId + "-main").name(boundedContextId).boundedContextId(boundedContextId)
                .main(true).build();
    }

    private static ProjectEntity proj(String id, String name, List<String> serviceIds) {
        return new ProjectEntity(id, name, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, serviceIds, null);
    }

    private static ModelEntity model(String id, ModelFieldEntity... fields) {
        return new ModelEntity(id, id, List.of(fields), List.of());
    }

    private static ModelFieldEntity field(String name, FieldDataType type) {
        return new ModelFieldEntity(name, name, true, type, null, false, null, List.of());
    }
}
