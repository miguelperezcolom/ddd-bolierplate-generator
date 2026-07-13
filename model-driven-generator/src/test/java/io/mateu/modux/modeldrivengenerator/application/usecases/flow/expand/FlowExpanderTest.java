package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.uidl.data.FieldDataType;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Validates that expanding a single {@code materializes} flow reproduces the structural pieces
 * that would otherwise be hand-wired (cf. the hotel reservas → frontoffice materialization).
 */
class FlowExpanderTest {

    private final FlowExpander expander = new FlowExpander();

    private Flow reservaVisibleEnFrontOffice() {
        return Flow.of(
                new FlowId("reservaVisibleEnFrontOffice"),
                new FlowName("ReservaVisibleEnFrontOffice"),
                "Materializa la reserva en frontoffice",
                FlowArchetype.MATERIALIZES,
                "agg-reserva",          // triggerAggregateId
                "ReservaCreada",        // triggerEvent
                "frontoffice",          // targetBoundedContextId
                "ReservaFrontOffice",   // readModelName
                List.of("localizador", "titular"),
                null,                   // targetUseCaseId (n/a for materializes)
                List.of(),              // inputMappings (n/a for materializes)
                List.of());
    }

    private FlowExpansionContext hotelContext() {
        return new FlowExpansionContext(
                "hotel", "reservas", "Reserva", "frontoffice",
                Map.of("localizador", FieldDataType.string, "titular", FieldDataType.string),
                null, null, "mod-reservas");
    }

    @Test
    void materializes_derives_all_six_pieces_with_conventions() {
        var x = expander.expand(reservaVisibleEnFrontOffice(), hotelContext());

        // Topic follows project.service.event convention
        var topic = "hotel.reservas.reserva-creada";
        assertEquals(topic, x.integrationEvent().topicName());
        assertEquals(topic, x.domainEvent().topicName());
        assertEquals(topic, x.subscription().topicName());

        // Domain event is published as integration event, with reliable defaults
        assertTrue(x.domainEvent().publishAsIntegrationEvent());
        assertEquals("v1", x.integrationEvent().schemaVersion());
        assertTrue(x.integrationEvent().replayable());
        assertTrue(x.integrationEvent().deadLetterQueueEnabled());
        assertEquals(topic + ".dlq", x.integrationEvent().deadLetterQueueName());

        // Payload model carries exactly the fields that cross the boundary
        var fieldNames = x.payloadModel().fields().stream().map(f -> f.name()).toList();
        assertEquals(List.of("localizador", "titular"), fieldNames);
        assertEquals(FieldDataType.string, x.payloadModel().fields().get(0).type());

        // Read model materialized in the target context
        assertEquals("ReservaFrontOffice", x.readModel().name());
        assertEquals("frontoffice", x.readModel().boundedContextId());
        assertEquals(ReadModelStorageType.Relational, x.readModel().storageType());
        assertEquals(ReadModelConsistency.Eventual, x.readModel().consistency());
        assertEquals(x.payloadModel().id(), x.readModel().modelId());

        // Projection upserts the read model on the event
        assertEquals(x.readModel().id(), x.projection().readModelId());
        assertEquals(1, x.projection().handlers().size());
        var handler = x.projection().handlers().get(0);
        assertEquals(x.domainEvent().id(), handler.domainEventId());
        assertEquals(ProjectionEventHandlerType.Upsert, handler.type());

        // Subscription consumes from the source service into the target context, idempotently,
        // and drives the projection
        assertEquals("reservas", x.subscription().sourceService());
        assertEquals("frontoffice", x.subscription().consumerGroup());
        assertTrue(x.subscription().idempotencyEnabled());
        assertEquals(1, x.subscription().actions().size());
        var action = x.subscription().actions().get(0);
        assertEquals(SubscriptionActionType.UpdateProjection, action.type());
        assertEquals(x.projection().id(), action.projectionId());
    }

    @Test
    void triggers_derives_event_integration_mapping_and_callusecase_subscription() {
        var flow = Flow.of(
                new FlowId("reservaCreaEstancia"),
                new FlowName("ReservaCreaEstancia"),
                null,
                FlowArchetype.TRIGGERS,
                "agg-reserva", "ReservaCreada", "frontoffice",
                null, List.of("localizador", "titular"),
                "uc-crearEstancia", List.of(), List.of());
        var ctx = new FlowExpansionContext(
                "hotel", "reservas", "Reserva", "frontoffice",
                Map.of("localizador", FieldDataType.string, "titular", FieldDataType.string),
                "CrearEstancia", "model-crearEstancia-input", "mod-reservas");

        var x = expander.expand(flow, ctx);

        // event + integration event still produced; no read model / projection
        assertEquals("hotel.reservas.reserva-creada", x.integrationEvent().topicName());
        assertTrue(x.domainEvent().publishAsIntegrationEvent());
        assertEquals(null, x.readModel());
        assertEquals(null, x.projection());

        // model mapping payload → use case input
        assertNotNull(x.modelMapping());
        assertEquals(x.payloadModel().id(), x.modelMapping().sourceModelId());
        assertEquals("model-crearEstancia-input", x.modelMapping().targetModelId());

        // subscription calls the use case with that mapping
        var action = x.subscription().actions().get(0);
        assertEquals(SubscriptionActionType.CallUseCase, action.type());
        assertEquals("uc-crearEstancia", action.useCaseId());
        assertEquals(x.modelMapping().id(), action.modelMappingId());
    }

    @Test
    void triggers_with_renames_produces_model_mapping_rules() {
        var flow = Flow.of(
                new FlowId("reservaCreaEstancia"),
                new FlowName("ReservaCreaEstancia"),
                null,
                FlowArchetype.TRIGGERS,
                "agg-reserva", "ReservaCreada", "frontoffice",
                null, List.of("locator", "holder"),
                "uc-crearEstancia",
                List.of("titular=holder", "localizador=locator"),   // targetInput=sourcePayload
                List.of());
        var ctx = new FlowExpansionContext(
                "hotel", "reservas", "Reserva", "frontoffice",
                Map.of("locator", FieldDataType.string, "holder", FieldDataType.string),
                "CrearEstancia", "model-crearEstancia-input", "mod-reservas");

        var x = expander.expand(flow, ctx);

        var rules = x.modelMapping().rules();
        assertEquals(2, rules.size());
        assertEquals("holder", rules.get(0).sourceFieldId());
        assertEquals("titular", rules.get(0).targetFieldId());
        assertEquals("locator", rules.get(1).sourceFieldId());
        assertEquals("localizador", rules.get(1).targetFieldId());
    }

    @Test
    void notifies_only_publishes_the_event_outbound() {
        var flow = Flow.of(
                new FlowId("avisaPasarela"), new FlowName("AvisaPasarela"), null,
                FlowArchetype.NOTIFIES,
                "agg-reserva", "ReservaCreada", "external",
                null, List.of("localizador"), null, List.of(), List.of());
        var ctx = new FlowExpansionContext("hotel", "reservas", "Reserva", "external",
                Map.of("localizador", FieldDataType.string), null, null, "mod-reservas");

        var x = expander.expand(flow, ctx);

        assertNotNull(x.integrationEvent());
        assertTrue(x.integrationEvent().replayable());
        assertEquals(null, x.readModel());
        assertEquals(null, x.projection());
        assertEquals(null, x.subscription());
        assertEquals(null, x.saga());
    }

    @Test
    void orchestrates_starts_a_saga_from_the_event() {
        var flow = Flow.of(
                new FlowId("procesoCheckin"), new FlowName("ProcesoCheckin"), null,
                FlowArchetype.ORCHESTRATES,
                "agg-reserva", "ReservaCreada", "frontoffice",
                null, List.of("localizador"), null, List.of(), List.of());
        var ctx = new FlowExpansionContext("hotel", "reservas", "Reserva", "frontoffice",
                Map.of("localizador", FieldDataType.string), null, null, "mod-reservas");

        var x = expander.expand(flow, ctx);

        assertNotNull(x.saga());
        assertEquals(List.of(x.domainEvent().id()), x.saga().triggeringEventIds());
        var action = x.subscription().actions().get(0);
        assertEquals(SubscriptionActionType.StartSaga, action.type());
        assertEquals(x.saga().id(), action.sagaId());
    }

    @Test
    void kebab_handles_pascal_and_plain_words() {
        assertEquals("reserva-creada", FlowExpander.kebab("ReservaCreada"));
        assertEquals("reservas", FlowExpander.kebab("reservas"));
        assertNotNull(FlowExpander.kebab(""));
    }
}
