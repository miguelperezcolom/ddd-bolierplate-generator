package io.mateu.modux.modeldrivengenerator.application.usecases.page.derive;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PageUseCaseDerivationTest {

    private static final AggregateEntity RESERVA = new AggregateEntity(
            "agg-reserva", "Reserva", "m-reserva", null, null, null, null,
            false, false, null, List.of(), List.of(), List.of(), null, false);

    private static PageEntity crudPage() {
        return new PageEntity("pg-reservas", "Reservas", "/reservas", "CRUD",
                "agg-reserva", "m-reserva", null, null, null,
                List.of(new PageButtonEntity("Confirmar llegada", null, null, null)),
                null, null, null, null, null, null, null, null);
    }

    private static UseCaseStepEntity lastStep(UseCaseEntity uc) {
        return uc.steps().get(uc.steps().size() - 1);
    }

    @Test
    void a_crud_page_derives_the_trio_with_pipelines_the_lifecycle_events_and_the_listing_query() {
        var result = PageUseCaseDerivation.derive(crudPage(), List.of(RESERVA),
                List.of(), List.of(), List.of());

        // trio + button stub
        var ids = result.newUseCases().stream().map(UseCaseEntity::id).toList();
        assertTrue(ids.contains("uc-crearAgg-reserva"));
        assertTrue(ids.contains("uc-actualizarAgg-reserva"));
        assertTrue(ids.contains("uc-eliminarAgg-reserva"));
        assertTrue(ids.contains("uc-pg-reservas-confirmar-llegada"));

        // the CRUD stubs are UI-exposed and carry their persistence pipeline + the publish step
        var create = result.newUseCases().stream()
                .filter(uc -> uc.id().equals("uc-crearAgg-reserva")).findFirst().orElseThrow();
        assertTrue(create.exposedAsUi());
        assertEquals("m-reserva", create.inputModelId());
        assertEquals(UseCaseStepType.SaveAggregate, create.steps().get(0).type());
        assertEquals("agg-reserva", create.steps().get(0).aggregateId());
        assertEquals(UseCaseStepType.PublishDomainEvent, lastStep(create).type());
        assertEquals("ev-agg-reservaCreada", lastStep(create).domainEventId());

        var update = result.newUseCases().stream()
                .filter(uc -> uc.id().equals("uc-actualizarAgg-reserva")).findFirst().orElseThrow();
        assertEquals(List.of(UseCaseStepType.ReadAggregate, UseCaseStepType.SaveAggregate,
                        UseCaseStepType.PublishDomainEvent),
                update.steps().stream().map(UseCaseStepEntity::type).toList());
        assertEquals("ev-agg-reservaModificada", lastStep(update).domainEventId());

        var delete = result.newUseCases().stream()
                .filter(uc -> uc.id().equals("uc-eliminarAgg-reserva")).findFirst().orElseThrow();
        assertEquals(null, delete.inputModelId());
        assertEquals(UseCaseStepType.Custom, delete.steps().get(0).type());
        assertEquals("ev-agg-reservaEliminada", lastStep(delete).domainEventId());

        // the three lifecycle domain events come along (feminine participle for «Reserva»)
        assertEquals(List.of("ev-agg-reservaCreada", "ev-agg-reservaModificada", "ev-agg-reservaEliminada"),
                result.newDomainEvents().stream().map(DomainEventEntity::id).toList());
        assertEquals("ReservaCreada", result.newDomainEvents().get(0).name());

        // the button is rewired to its stub and the listing gets its derived query service
        assertEquals("uc-pg-reservas-confirmar-llegada", result.rewiredPage().toolbar().get(0).useCaseId());
        assertNotNull(result.newQueryService());
        // the ONE canonical per-aggregate listing query (shared with the CRUD API), not a per-page one
        assertEquals("qs-crud-agg-reserva", result.rewiredPage().listingQueryServiceId());
        assertEquals("qs-crud-agg-reserva", result.newQueryService().id());
        assertEquals("m-reserva", result.newQueryService().operations().get(0).outputModelId());
    }

    @Test
    void deriving_twice_produces_nothing_new() {
        var first = PageUseCaseDerivation.derive(crudPage(), List.of(RESERVA),
                List.of(), List.of(), List.of());
        var second = PageUseCaseDerivation.derive(first.rewiredPage(), List.of(RESERVA),
                first.newUseCases(), List.of(first.newQueryService()), first.newDomainEvents());

        assertTrue(second.newUseCases().isEmpty());
        assertEquals(null, second.newQueryService());
        assertTrue(second.newDomainEvents().isEmpty());
        assertFalse(second.changed());
    }

    @Test
    void already_declared_events_are_not_duplicated_but_the_trio_still_wires_them() {
        var existing = new DomainEventEntity("ev-agg-reservaCreada", "ReservaCreada", null, false,
                null, null, null, null, null, null, false, null, null, null, null, false, null);

        var result = PageUseCaseDerivation.derive(crudPage(), List.of(RESERVA),
                List.of(), List.of(), List.of(existing));

        assertEquals(List.of("ev-agg-reservaModificada", "ev-agg-reservaEliminada"),
                result.newDomainEvents().stream().map(DomainEventEntity::id).toList());
        var create = result.newUseCases().stream()
                .filter(uc -> uc.id().equals("uc-crearAgg-reserva")).findFirst().orElseThrow();
        assertEquals("ev-agg-reservaCreada", lastStep(create).domainEventId());
    }

    @Test
    void a_form_page_only_derives_its_buttons() {
        var page = new PageEntity("pg-checkin", "CheckIn", "/checkin", "FORM",
                null, "m-checkin", null, null, null,
                List.of(new PageButtonEntity("Guardar", null, "uc-guardar-checkin", null)),
                null, null, null, null, null, null, null, null);

        var result = PageUseCaseDerivation.derive(page, List.of(), List.of(), List.of(), List.of());

        assertEquals(List.of("uc-guardar-checkin"),
                result.newUseCases().stream().map(UseCaseEntity::id).toList());
        assertEquals(null, result.newQueryService());
        assertTrue(result.newDomainEvents().isEmpty());
    }
}
