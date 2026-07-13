package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProcessExpanderTest {

    private final ProcessExpander expander = new ProcessExpander();

    private static final ProcessExpansionContext CTX = new ProcessExpansionContext(
            "hotel", "reservas", "Reserva", "mod-frontoffice", "FrontOffice", "evt-reservaCreada");

    private ProcessEntity checkinProcess() {
        return new ProcessEntity(
                "checkin", "CheckIn", "El check-in completo",
                "agg-reserva", "ReservaCreada", "mod-frontoffice",
                List.of(
                        step("verificar", "VerificarDocumentacion", ProcessStepType.HUMAN,
                                null, "recepcionista", "PT2H", "jefeRecepcion", null),
                        step("asignar", "AsignarHabitacion", ProcessStepType.AUTOMATED,
                                "uc-asignarHabitacion", null, null, null, "uc-liberarHabitacion"),
                        step("cobrar", "CobrarDeposito", ProcessStepType.AUTOMATED,
                                "uc-cobrarDeposito", null, null, null, null)),
                null, "P1D");
    }

    @Test
    void derives_subscription_saga_worklist_deadline_and_completion() {
        var x = expander.expand(checkinProcess(), CTX);

        // subscription starts the saga on the trigger event, idempotent + DLQ by convention
        assertEquals("hotel.reservas.reserva-creada", x.subscription().topicName());
        assertEquals(SubscriptionActionType.StartSaga, x.subscription().actions().get(0).type());
        assertEquals("saga-checkin", x.subscription().actions().get(0).sagaId());
        assertTrue(x.subscription().idempotencyEnabled());

        // saga: human step waits, automated steps call use cases, compensation wired by id
        assertEquals("CheckInSaga", x.saga().name());
        assertEquals(List.of("evt-reservaCreada"), x.saga().triggeringEventIds());
        var steps = x.saga().steps();
        assertEquals(4, steps.size()); // 3 steps + 1 compensation
        assertEquals("await:VerificarDocumentacion", steps.get(0).name());
        assertEquals(SagaStepType.Custom, steps.get(0).type());
        assertEquals(SagaStepType.CallUseCase, steps.get(1).type());
        assertEquals("uc-asignarHabitacion", steps.get(1).useCaseId());
        assertEquals("comp-asignar", steps.get(1).compensatingStepId());
        assertEquals("undo:AsignarHabitacion", steps.get(3).name());
        assertEquals("uc-liberarHabitacion", steps.get(3).useCaseId());
        // SLA P1D → saga timeout in millis
        assertEquals(86_400_000L, x.saga().timeoutMs());

        // human step → task worklist in the owner context
        assertNotNull(x.taskModel());
        assertEquals("CheckInTask", x.taskModel().name());
        assertNotNull(x.taskReadModel());
        assertEquals("mod-frontoffice", x.taskReadModel().boundedContextId());

        // deadline-bounded step → scheduled watch trigger
        assertEquals(1, x.deadlineTriggers().size());
        assertTrue(x.deadlineTriggers().get(0).description().contains("PT2H"));
        assertTrue(x.deadlineTriggers().get(0).description().contains("jefeRecepcion"));

        // completion event defaults to <Name>Completed and is published
        assertEquals("CheckInCompleted", x.completionEvent().name());
        assertTrue(x.completionEvent().publishAsIntegrationEvent());
        assertEquals("hotel.front-office.check-in-completed", x.completionEvent().topicName());
    }

    @Test
    void no_human_steps_means_no_worklist_and_no_triggers() {
        var process = new ProcessEntity(
                "facturar", "Facturacion", null,
                "agg-folio", "FolioCerrado", "mod-folios",
                List.of(step("emitir", "EmitirFactura", ProcessStepType.AUTOMATED,
                        "uc-emitirFactura", null, null, null, null)),
                "FacturaEmitida", null);

        var x = expander.expand(process, new ProcessExpansionContext(
                "hotel", "folios", "Folio", "mod-folios", "Folios", null));

        assertNull(x.taskModel());
        assertNull(x.taskReadModel());
        assertTrue(x.deadlineTriggers().isEmpty());
        assertTrue(x.saga().triggeringEventIds().isEmpty());
        assertEquals("FacturaEmitida", x.completionEvent().name());
        assertNull(x.saga().timeoutMs());
    }

    @Test
    void sla_parsing_handles_time_and_date_durations() {
        assertEquals(7_200_000L, ProcessExpander.slaMillis("PT2H"));
        assertEquals(86_400_000L, ProcessExpander.slaMillis("P1D"));
        assertNull(ProcessExpander.slaMillis(null));
        assertNull(ProcessExpander.slaMillis("nonsense"));
    }

    private static ProcessStepEntity step(String id, String name, ProcessStepType type,
                                          String useCaseId, String roleId, String deadline,
                                          String escalationRoleId, String compensationUseCaseId) {
        return new ProcessStepEntity(id, name, type, useCaseId, roleId, deadline,
                escalationRoleId, compensationUseCaseId, null);
    }
}
