package io.mateu.modux.modeldrivengenerator.application.usecases.model.journey;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelSnapshot;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

class ModelJourneyRendererTest {

    @Test
    void a_model_shows_every_role_it_plays_and_its_mapping_edges() {
        var reserva = new ModelEntity("m-reserva", "Reserva", List.of(), List.of());
        var bookInput = new ModelEntity("m-book", "BookInput", List.of(), List.of());

        var aggregate = new AggregateEntity("agg", "Reserva", "m-reserva", null, null, null, null,
                false, true, null, List.of(), List.of(), List.of(), null, false);
        var pax = new EntityEntity("ent-pax", "Pax", "m-book", "agg", true);
        var book = new UseCaseEntity("uc-book", "BookHotel", false, true, false, false, false,
                "m-book", "m-reserva", List.of(), List.of(), List.of(), null, null, null, null,
                null, null, null, null, null, false, null, null, null, false, null, false, null,
                "Reservas", "Book");
        var mapping = new ModelMappingEntity("mm", "BookToReserva", "m-book", "m-reserva", false, List.of());

        var snapshot = new ModelSnapshot(null, null, null, List.of(aggregate),
                List.of(reserva, bookInput), List.of(book), null, null, null, null, null,
                null, null, null, null, null, null, List.of(mapping), List.of(pax));

        var md = ModelJourneyRenderer.render(snapshot);

        // Reserva: aggregate state (event-sourced), use case output, fed by BookInput
        assertTrue(md.contains("estado del agregado **Reserva** (event-sourced)"));
        assertTrue(md.contains("respuesta de **BookHotel** _(gRPC)_"));
        assertTrue(md.contains("← se alimenta de **BookInput** vía `BookToReserva`"));
        // BookInput: command input, entity inside the aggregate, transforms into Reserva
        assertTrue(md.contains("comando de **BookHotel**"));
        assertTrue(md.contains("entidad **Pax** dentro del agregado **Reserva** (colección)"));
        assertTrue(md.contains("→ se transforma en **Reserva** vía `BookToReserva`"));
    }

    @Test
    void an_unused_model_is_flagged_in_the_journey() {
        var orphan = new ModelEntity("m-x", "Huerfano", List.of(), List.of());
        var snapshot = new ModelSnapshot(null, null, null, null, List.of(orphan), null, null,
                null, null, null, null, null, null, null, null, null, null, null, null);

        var md = ModelJourneyRenderer.render(snapshot);

        assertTrue(md.contains("Modelo sin uso"));
    }
}
