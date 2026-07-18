package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DerivedElementIdsTest {

    private final DerivedElementIds ids = DerivedElementIds.from(
            List.of("reserva", "compra-hotel"), List.of("pagina-reservas"));

    @Test
    void marksTheActorCrudTrio() {
        assertTrue(ids.isDerivedUseCase("uc-crearReserva"));
        assertTrue(ids.isDerivedUseCase("uc-actualizarReserva"));
        assertTrue(ids.isDerivedUseCase("uc-eliminarCompra-hotel"));
    }

    @Test
    void marksTheLifecycleDomainEventsInBothGenders() {
        assertTrue(ids.isDerivedDomainEvent("ev-reservaCreada"));
        assertTrue(ids.isDerivedDomainEvent("ev-reservaCreado"));
        assertTrue(ids.isDerivedDomainEvent("ev-compra-hotelModificado"));
        assertTrue(ids.isDerivedDomainEvent("ev-compra-hotelEliminada"));
        assertFalse(ids.isDerivedDomainEvent("ev-estanciaCreada"));
    }

    @Test
    void marksThePageCrudTrio() {
        assertTrue(ids.isDerivedUseCase("uc-reserva-create"));
        assertTrue(ids.isDerivedUseCase("uc-compra-hotel-update"));
        assertTrue(ids.isDerivedUseCase("uc-compra-hotel-delete"));
    }

    @Test
    void marksPageButtonStubsAndTheListingQueryService() {
        assertTrue(ids.isDerivedUseCase("uc-pagina-reservas-confirmar"));
        assertTrue(ids.isDerivedQueryService("qs-pagina-reservas"));
    }

    @Test
    void leavesHandDeclaredElementsUnmarked() {
        assertFalse(ids.isDerivedUseCase("uc-realizar-checkin"));
        assertFalse(ids.isDerivedUseCase("uc-crear")); // no aggregate behind the prefix
        assertFalse(ids.isDerivedQueryService("qs-reservas-del-dia"));
    }
}
