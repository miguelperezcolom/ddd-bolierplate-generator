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
                "frontoffice",          // targetModuleId
                "ReservaFrontOffice",   // readModelName
                List.of("localizador", "titular"),
                null,                   // targetUseCaseId (n/a for materializes)
                List.of());
    }

    private FlowExpansionContext hotelContext() {
        return new FlowExpansionContext(
                "hotel", "reservas", "Reserva", "frontoffice",
                Map.of("localizador", FieldDataType.string, "titular", FieldDataType.string));
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
        assertEquals("frontoffice", x.readModel().moduleId());
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
    void kebab_handles_pascal_and_plain_words() {
        assertEquals("reserva-creada", FlowExpander.kebab("ReservaCreada"));
        assertEquals("reservas", FlowExpander.kebab("reservas"));
        assertNotNull(FlowExpander.kebab(""));
    }
}
