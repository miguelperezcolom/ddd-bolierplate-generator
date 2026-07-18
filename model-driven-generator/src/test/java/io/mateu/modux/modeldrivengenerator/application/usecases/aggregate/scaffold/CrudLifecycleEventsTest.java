package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CrudLifecycleEventsTest {

    @Test
    void feminine_aggregate_names_take_feminine_participles() {
        var events = CrudLifecycleEvents.lifecycleOf("reserva", "Reserva");
        assertEquals("ev-reservaCreada", events.get(0).id());
        assertEquals("ReservaCreada", events.get(0).name());
        assertEquals("ev-reservaModificada", events.get(1).id());
        assertEquals("ev-reservaEliminada", events.get(2).id());
    }

    @Test
    void other_aggregate_names_take_masculine_participles() {
        var events = CrudLifecycleEvents.lifecycleOf("pedido", "Pedido");
        assertEquals("ev-pedidoCreado", events.get(0).id());
        assertEquals("PedidoCreado", events.get(0).name());
        assertEquals("ev-pedidoModificado", events.get(1).id());
        assertEquals("ev-pedidoEliminado", events.get(2).id());
    }

    @Test
    void the_publish_step_points_at_the_event() {
        var event = CrudLifecycleEvents.lifecycleOf("reserva", "Reserva").get(0);
        var step = CrudLifecycleEvents.publishStep(event);
        assertEquals("ev-reservaCreada", step.domainEventId());
        assertEquals(io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo
                .UseCaseStepType.PublishDomainEvent, step.type());
    }
}
