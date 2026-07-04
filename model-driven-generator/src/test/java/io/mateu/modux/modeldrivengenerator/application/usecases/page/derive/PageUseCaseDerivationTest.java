package io.mateu.modux.modeldrivengenerator.application.usecases.page.derive;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
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

    @Test
    void a_crud_page_derives_the_standard_trio_a_listing_query_and_wires_buttons() {
        var page = new PageEntity("pg-reservas", "Reservas", "/reservas", "CRUD",
                "agg-reserva", "m-reserva", null, null, null,
                List.of(new PageButtonEntity("Confirmar llegada", null, null, null)),
                null, null, null, null, null, null, null, null);

        var result = PageUseCaseDerivation.derive(page, List.of(RESERVA), List.of(), List.of());

        // trio + button stub
        var ids = result.newUseCases().stream().map(UseCaseEntity::id).toList();
        assertTrue(ids.contains("uc-agg-reserva-create"));
        assertTrue(ids.contains("uc-agg-reserva-update"));
        assertTrue(ids.contains("uc-agg-reserva-delete"));
        assertTrue(ids.contains("uc-pg-reservas-confirmar-llegada"));
        // stubs are UI-exposed, stepless, with the page's model as input
        var create = result.newUseCases().stream().filter(uc -> uc.id().equals("uc-agg-reserva-create")).findFirst().orElseThrow();
        assertTrue(create.exposedAsUi());
        assertTrue(create.steps().isEmpty());
        assertEquals("m-reserva", create.inputModelId());
        // the button is rewired to its stub
        assertEquals("uc-pg-reservas-confirmar-llegada", result.rewiredPage().toolbar().get(0).useCaseId());
        // the listing gets a derived query service with a paged list operation
        assertNotNull(result.newQueryService());
        assertEquals("qs-pg-reservas", result.rewiredPage().listingQueryServiceId());
        assertEquals("m-reserva", result.newQueryService().operations().get(0).outputModelId());
    }

    @Test
    void deriving_twice_produces_nothing_new() {
        var page = new PageEntity("pg-reservas", "Reservas", "/reservas", "CRUD",
                "agg-reserva", "m-reserva", null, null, null,
                List.of(new PageButtonEntity("Confirmar llegada", null, null, null)),
                null, null, null, null, null, null, null, null);

        var first = PageUseCaseDerivation.derive(page, List.of(RESERVA), List.of(), List.of());
        var second = PageUseCaseDerivation.derive(first.rewiredPage(), List.of(RESERVA),
                first.newUseCases(), List.of(first.newQueryService()));

        assertTrue(second.newUseCases().isEmpty());
        assertEquals(null, second.newQueryService());
        assertFalse(second.changed());
    }

    @Test
    void a_form_page_only_derives_its_buttons() {
        var page = new PageEntity("pg-checkin", "CheckIn", "/checkin", "FORM",
                null, "m-checkin", null, null, null,
                List.of(new PageButtonEntity("Guardar", null, "uc-guardar-checkin", null)),
                null, null, null, null, null, null, null, null);

        var result = PageUseCaseDerivation.derive(page, List.of(), List.of(), List.of());

        assertEquals(List.of("uc-guardar-checkin"),
                result.newUseCases().stream().map(UseCaseEntity::id).toList());
        assertEquals(null, result.newQueryService());
    }
}
