package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatehla.GenerateHlaUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The design document (HLA) is generated FROM the model: prose, ADR table and derived mermaid
 * diagrams. Validated against the HLA booking sample — the document the dev team receives is a
 * report of the spec, so it cannot drift. Pass -DhlaOut=<path> to also write the showcase file.
 */
@SpringBootTest
class GenerateHlaTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Autowired
    GenerateHlaUseCase generateHla;

    @Test
    void hla_document_is_derived_from_the_booking_spec() throws Exception {
        var temp = Files.createTempDirectory("hla-doc-test").resolve("model-driven-store.yaml");
        Files.copy(Path.of("..", "sample", "hla-booking", "model-driven-store.yaml"), temp);
        repository.loadFrom(temp.toAbsolutePath().toString());

        var md = generateHla.render();

        // §1 prose from project.objective
        assertTrue(md.contains("## 1. Contexto y objetivo"));
        assertTrue(md.contains("strangler fig"));
        // §2 the ADR table carries the resolved hold decision
        assertTrue(md.contains("**Sin hold de cupo (book atómico)**"));
        // §3 structural view: services as subgraphs, external systems, relations
        assertTrue(md.contains("flowchart LR"));
        assertTrue(md.contains("OPEN_HOST_SERVICE"));
        assertTrue(md.contains("rumbo · PMS (Oracle)"));
        // §5 the booking process becomes a sequence diagram with its steps
        assertTrue(md.contains("sequenceDiagram"));
        assertTrue(md.contains("BookFolio"));
        assertTrue(md.contains("tarea 'RevisarReservaFallida' (plazo PT4H)"));
        // §6 the lifecycle becomes a state diagram, with operations as labels and terminal states
        assertTrue(md.contains("stateDiagram-v2"));
        assertTrue(md.contains("Pending --> Confirmed: Confirmar"));
        assertTrue(md.contains("Cancelled --> [*]"));
        // §7 transversals derived from flags
        assertTrue(md.contains("BookHotel (clave `bookingReference`)"));
        assertTrue(md.contains("Reserva.holderEmail (PII → CRYPTO_SHRED)"));
        assertTrue(md.contains("**Tenancy**: NONE"));
        // §8 exposed contracts
        assertTrue(md.contains("Reservas.Book"));
        // §9 no open points (all decisions ACCEPTED)
        assertTrue(md.contains("## 9. Puntos abiertos"));
        assertTrue(md.contains("_Ninguno"));

        var out = System.getProperty("hlaOut");
        if (out != null && !out.isBlank()) {
            generateHla.writeTo(Path.of(out));
        }
    }
}
