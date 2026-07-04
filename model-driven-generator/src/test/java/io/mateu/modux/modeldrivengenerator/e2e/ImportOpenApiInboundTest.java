package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiInboundCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiInboundUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Inbound OpenAPI import: the EasyTravelAPI contract (mini fixture) lands on the BFF module of the
 * HLA booking sample as REST-exposed use-case stubs with typed models — the missing half of the
 * outbound (gateway) import.
 */
@SpringBootTest
class ImportOpenApiInboundTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Autowired
    ImportOpenApiInboundUseCase useCase;

    @Test
    void easytravel_contract_becomes_rest_use_cases_on_the_bff_module() throws Exception {
        // work on a throwaway copy — loadFrom + save persist to the loaded file
        var temp = java.nio.file.Files.createTempDirectory("hla-inbound-test")
                .resolve("model-driven-store.yaml");
        java.nio.file.Files.copy(
                java.nio.file.Path.of("..", "sample", "hla-booking", "model-driven-store.yaml"), temp);
        repository.loadFrom(temp.toAbsolutePath().toString());

        useCase.handle(new ImportOpenApiInboundCommand("mod-distribution",
                new java.io.File("src/test/resources/easytravel-mini.yaml").getAbsolutePath()));

        var bookHotel = repository.findById("uc-bookHotel", UseCaseEntity.class).orElseThrow();
        assertTrue(bookHotel.exposedAsRest());
        assertEquals("POST", bookHotel.restHttpMethod());
        assertEquals("/hotels/book", bookHotel.restPath());
        assertTrue(bookHotel.steps().isEmpty(), "stub: the developer implements the behaviour");

        // 'uc-getBooking' belongs to mod-reservas — the import must NOT hijack it: scoped id instead
        var getBooking = repository.findById("uc-distribution-getBooking", UseCaseEntity.class).orElseThrow();
        assertEquals("GET", getBooking.restHttpMethod());
        var reservasGetBooking = repository.findById("uc-getBooking", UseCaseEntity.class).orElseThrow();
        assertTrue(reservasGetBooking.exposedAsGrpc(), "the original reservas use case is untouched");

        // typed models from components.schemas, wired as input/output
        assertEquals(bookHotel.inputModelId(), repositoryModelIdByName("BookHotelRequest"));
        assertEquals(bookHotel.outputModelId(), repositoryModelIdByName("BookingStatus"));

        // attached to the module (idempotent on re-import)
        var module = repository.findById("mod-distribution", ModuleEntity.class).orElseThrow();
        assertTrue(module.useCaseIds().contains("uc-bookHotel"));
        assertTrue(module.useCaseIds().contains("uc-distribution-getBooking"));
        // the module's own metadata (bff, subdomain) survives the import
        assertEquals(1, module.bffs().size());
        useCase.handle(new ImportOpenApiInboundCommand("mod-distribution",
                new java.io.File("src/test/resources/easytravel-mini.yaml").getAbsolutePath()));
        var again = repository.findById("mod-distribution", ModuleEntity.class).orElseThrow();
        assertEquals(module.useCaseIds().size(), again.useCaseIds().size());
    }

    private String repositoryModelIdByName(String name) {
        return repository.findAllOfType(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity.class)
                .stream().filter(m -> name.equals(m.name())).findFirst().orElseThrow().id();
    }
}
