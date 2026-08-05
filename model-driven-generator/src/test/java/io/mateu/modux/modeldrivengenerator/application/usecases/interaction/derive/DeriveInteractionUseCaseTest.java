package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.derive;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared.InteractionDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemUseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionActionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.Identifiable;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The derivation walks the declared mechanisms in DFS pre-order: steps in order, one EVENT
 * message per consumer, recursion on use cases, cycles cut with the DFS path. Every derived
 * message is backed by construction (it IS the mechanism).
 */
class DeriveInteractionUseCaseTest {

    // ---- the booking fixture: checkin → validar (+externo), query, aggregate, evento con 2 consumidores

    private static FakeStore bookingStore() {
        var reserva = new AggregateEntity("reserva", "Reserva", null, null, null, null, null,
                false, false, null,
                List.of(new OperationEntity("op-checkin", "checkin", null, null, null, null, null,
                        null, false, null)),
                List.of(), List.of(), null, false);
        var checkinRealizado = new DomainEventEntity("ev-checkin", "CheckinRealizado", null, false,
                null, null, null, null, null, null, false, null, null, null, null, false, null);
        var qs = new QueryServiceEntity("qs-disponibilidad", "Disponibilidad", null, null, List.of());
        var housekeeping = ExternalSystemEntity.builder()
                .id("housekeeping").name("Housekeeping")
                .useCases(List.of(new ExternalSystemUseCaseEntity("ext-limpieza", "POST /limpieza", null)))
                .build();
        // external systems are top-level elements now, not a field of the project
        var project = ProjectEntity.builder().id("p1").build();

        var ucValidar = useCase("uc-validar",
                step(UseCaseStepType.CallExternalUseCase, null, null, null, null, null, null, "ext-limpieza"));
        var ucNotificar = useCase("uc-notificar",
                step(UseCaseStepType.CallQueryService, null, null, null, null, "qs-disponibilidad", null, null));
        var ucAuditar = useCase("uc-auditar");
        var ucCheckin = useCase("uc-realizar-checkin",
                step(UseCaseStepType.CallUseCase, null, null, null, "uc-validar", null, null, null),
                step(UseCaseStepType.CallQueryService, null, null, null, null, "qs-disponibilidad", null, null),
                step(UseCaseStepType.CallAggregateOperation, "reserva", "op-checkin", null, null, null, null, null),
                step(UseCaseStepType.PublishDomainEvent, null, null, "ev-checkin", null, null, null, null));

        var flow = new FlowEntity("f1", "CheckinDisparaNotificacion", null, FlowArchetype.TRIGGERS,
                "reserva", "CheckinRealizado", "mod-b", null, List.of(), "uc-notificar", List.of(), List.of());
        var subscription = new SubscriptionEntity("s1", "AuditaCheckins", "CheckinRealizado", null, null,
                null, null, null, null,
                List.of(new SubscriptionActionEntity("a1", "Auditar", SubscriptionActionType.CallUseCase,
                        "uc-auditar", null, null, null)),
                null, null, null, null, null, null, false, null, null);

        return new FakeStore()
                .with(AggregateEntity.class, List.of(reserva))
                .with(DomainEventEntity.class, List.of(checkinRealizado))
                .with(QueryServiceEntity.class, List.of(qs))
                .with(ProjectEntity.class, List.of(project))
                .with(ExternalSystemEntity.class, List.of(housekeeping))
                .with(UseCaseEntity.class, List.of(ucCheckin, ucValidar, ucNotificar, ucAuditar))
                .with(FlowEntity.class, List.of(flow))
                .with(SubscriptionEntity.class, List.of(subscription));
    }

    @Test
    void use_case_derivation_walks_steps_in_order_and_fans_out_events() {
        var dto = new DeriveInteractionUseCase(bookingStore()).derive("USE_CASE", "uc-realizar-checkin");

        assertNull(dto.id());
        assertTrue(dto.ephemeral());
        assertEquals("USE_CASE", dto.triggerKind());
        assertEquals("uc-realizar-checkin", dto.triggerRef());

        var expected = List.of(
                // step 1: nested call, expanded before the next step (DFS pre-order)
                new String[]{"uc-realizar-checkin", "uc-validar", "COMMAND", "0"},
                new String[]{"uc-validar", "housekeeping", "EXTERNAL", "1"},
                // steps 2 and 3, back at depth 0
                new String[]{"uc-realizar-checkin", "qs-disponibilidad", "QUERY", "0"},
                new String[]{"uc-realizar-checkin", "reserva", "COMMAND", "0"},
                // step 4 publishes: one EVENT per consumer; use case consumers recurse
                new String[]{"uc-realizar-checkin", "uc-notificar", "EVENT", "0"},
                new String[]{"uc-notificar", "qs-disponibilidad", "QUERY", "1"},
                new String[]{"uc-realizar-checkin", "uc-auditar", "EVENT", "0"});
        assertEquals(expected.size(), dto.messages().size(), () -> "messages: " + dto.messages());
        for (int i = 0; i < expected.size(); i++) {
            var message = dto.messages().get(i);
            assertEquals("m" + (i + 1), message.id());
            assertEquals(expected.get(i)[0], message.fromRef(), "from of " + message);
            assertEquals(expected.get(i)[1], message.toRef(), "to of " + message);
            assertEquals(expected.get(i)[2], message.kind(), "kind of " + message);
            assertEquals(Integer.parseInt(expected.get(i)[3]), message.depth(), "depth of " + message);
            assertTrue(message.backed(), "every derived message is backed by construction: " + message);
        }
        // the event messages carry the event name; the aggregate call names the operation
        assertEquals("CheckinRealizado", dto.messages().get(4).label());
        assertEquals("checkin()", dto.messages().get(3).label());

        var participants = dto.participants().stream()
                .map(InteractionDto.ParticipantDto::ref)
                .toList();
        assertEquals(List.of("uc-realizar-checkin", "uc-validar", "housekeeping", "qs-disponibilidad",
                "reserva", "uc-notificar", "uc-auditar"), participants);
        var types = dto.participants().stream()
                .collect(java.util.stream.Collectors.toMap(InteractionDto.ParticipantDto::ref,
                        InteractionDto.ParticipantDto::type));
        assertEquals("EXTERNAL_SYSTEM", types.get("housekeeping"));
        assertEquals("QUERY_SERVICE", types.get("qs-disponibilidad"));
        assertEquals("AGGREGATE", types.get("reserva"));
    }

    @Test
    void event_derivation_starts_at_the_emitter_and_reaches_every_consumer() {
        var dto = new DeriveInteractionUseCase(bookingStore()).derive("EVENT", "CheckinRealizado");

        assertEquals("EVENT", dto.triggerKind());
        assertEquals("CheckinRealizado", dto.triggerRef());
        assertEquals(3, dto.messages().size(), () -> "messages: " + dto.messages());
        // the use case publishing via a PublishDomainEvent step is the emitter
        assertEquals("uc-realizar-checkin", dto.messages().get(0).fromRef());
        assertEquals("uc-notificar", dto.messages().get(0).toRef());
        assertEquals("EVENT", dto.messages().get(0).kind());
        assertEquals(0, dto.messages().get(0).depth());
        // the consumer's own pipeline follows, nested
        assertEquals("uc-notificar", dto.messages().get(1).fromRef());
        assertEquals("qs-disponibilidad", dto.messages().get(1).toRef());
        assertEquals(1, dto.messages().get(1).depth());
        // the second consumer (via subscription)
        assertEquals("uc-realizar-checkin", dto.messages().get(2).fromRef());
        assertEquals("uc-auditar", dto.messages().get(2).toRef());
        assertTrue(dto.messages().stream().allMatch(InteractionDto.MessageDto::backed));
    }

    @Test
    void cycles_are_cut_with_the_dfs_path() {
        var store = new FakeStore()
                .with(QueryServiceEntity.class, List.of(
                        new QueryServiceEntity("qs-x", "X", null, null, List.of())))
                .with(UseCaseEntity.class, List.of(
                        useCase("uc-a", step(UseCaseStepType.CallUseCase, null, null, null, "uc-b", null, null, null)),
                        useCase("uc-b",
                                step(UseCaseStepType.CallUseCase, null, null, null, "uc-a", null, null, null),
                                step(UseCaseStepType.CallQueryService, null, null, null, null, "qs-x", null, null))));

        var dto = new DeriveInteractionUseCase(store).derive("USE_CASE", "uc-a");

        // the message closing the loop IS emitted; its expansion is not (no infinite recursion)
        assertEquals(3, dto.messages().size(), () -> "messages: " + dto.messages());
        assertEquals("uc-b", dto.messages().get(0).toRef());
        assertEquals("uc-a", dto.messages().get(1).toRef());
        assertEquals("uc-b", dto.messages().get(1).fromRef());
        assertEquals("qs-x", dto.messages().get(2).toRef());
    }

    @Test
    void api_operation_derivation_wires_the_operation_to_its_use_case() {
        var api = ApiEntity.builder().id("api-publica").name("API pública")
                .operations(List.of(ApiOperationEntity.builder()
                        .id("op-checkin").name("POST /checkin")
                        .targetUseCaseId("uc-realizar-checkin").build()))
                .build();
        var store = bookingStore().with(ApiEntity.class, List.of(api));

        var dto = new DeriveInteractionUseCase(store).derive("API_OPERATION", "op-checkin");

        assertTrue(dto.ephemeral());
        var first = dto.messages().get(0);
        assertEquals("op-checkin", first.fromRef());
        assertEquals("uc-realizar-checkin", first.toRef());
        assertEquals("COMMAND", first.kind());
        assertEquals(0, first.depth());
        assertTrue(first.backed());
        // the implementing pipeline nests below
        assertEquals(1, dto.messages().get(1).depth());
        var participants = dto.participants().stream().map(InteractionDto.ParticipantDto::ref).toList();
        assertEquals("op-checkin", participants.get(0));
        assertEquals("API_OPERATION", dto.participants().get(0).type());
    }

    // ---- fixtures ----------------------------------------------------------------------------

    private static UseCaseEntity useCase(String id, UseCaseStepEntity... steps) {
        return new UseCaseEntity(id, id, false, false, false, false, false, null, null,
                List.of(steps), null, null, null, null, null, null, null, null, null, null, null,
                false, null, null, null, false, null, false, null, null, null, List.of(), false, null);
    }

    private static UseCaseStepEntity step(UseCaseStepType type, String aggregateId, String operationId,
                                          String domainEventId, String useCaseId, String queryServiceId,
                                          String applicationEventId, String externalUseCaseId) {
        return new UseCaseStepEntity(null, null, type, aggregateId, operationId, null, null,
                domainEventId, useCaseId, null, queryServiceId, null, null, applicationEventId,
                externalUseCaseId, null);
    }

    /** Minimal in-memory store: the derivation only reads via findAllOfType. */
    private static final class FakeStore implements ModelStore {

        private final Map<Class<?>, List<Object>> data = new HashMap<>();

        <T> FakeStore with(Class<T> type, List<? extends T> elements) {
            data.put(type, new ArrayList<>(elements));
            return this;
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> Optional<T> findById(String id, Class<T> type) {
            return findAllOfType(type).stream()
                    .filter(e -> e instanceof Identifiable i && i.id().equals(id))
                    .findFirst();
        }

        @Override
        public void save(Identifiable element) {
            throw new UnsupportedOperationException();
        }

        @Override
        public void putTransient(Identifiable element) {
            throw new UnsupportedOperationException();
        }

        @Override
        public <T> ListingData<T> findAll(String searchText, Object filters, Pageable pageable, Class<T> type) {
            throw new UnsupportedOperationException();
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> List<T> findAllOfType(Class<T> type) {
            return (List<T>) data.getOrDefault(type, List.of());
        }

        @Override
        public Collection<Object> allElements() {
            throw new UnsupportedOperationException();
        }

        @Override
        public <T> void deleteAllById(List<String> ids, Class<T> type) {
            throw new UnsupportedOperationException();
        }

        @Override
        public AllData snapshot() {
            throw new UnsupportedOperationException();
        }

        @Override
        public void replaceWith(AllData data) {
            throw new UnsupportedOperationException();
        }

        @Override
        public Path storePath() {
            throw new UnsupportedOperationException();
        }

        @Override
        public boolean startedFromScratch() {
            throw new UnsupportedOperationException();
        }

        @Override
        public void reload() {
            throw new UnsupportedOperationException();
        }
    }
}
