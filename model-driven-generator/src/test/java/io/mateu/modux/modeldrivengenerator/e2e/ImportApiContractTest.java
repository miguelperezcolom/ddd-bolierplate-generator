package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiExternalCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiExternalUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl.ImportWsdlCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl.ImportWsdlUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * API-contract imports towards their two NEW targets: an external system gains the
 * operations it offers (OpenAPI or WSDL — the callable/pollable partner surface), and a
 * bounded context gains SOAP use-case stubs to implement. Re-imports must update, not
 * duplicate, and the module target must never hijack another module's use-case id.
 */
@SpringBootTest
class ImportApiContractTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    CommonFileRepository repository;

    @Autowired
    ImportOpenApiExternalUseCase openApiExternal;

    @Autowired
    ImportWsdlUseCase wsdl;

    private void loadSampleCopy() throws Exception {
        // work on a throwaway copy — loadFrom + save persist to the loaded file
        var temp = java.nio.file.Files.createTempDirectory("import-contract-test")
                .resolve("model-driven-store.yaml");
        java.nio.file.Files.copy(
                java.nio.file.Path.of("..", "sample", "hla-booking", "model-driven-store.yaml"), temp);
        repository.loadFrom(temp.toAbsolutePath().toString());
    }

    private io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity rumbo() {
        return repository.findAllOfType(ProjectEntity.class).get(0).externalSystems().stream()
                .filter(x -> x.id().equals("ext-rumbo")).findFirst().orElseThrow();
    }

    @Test
    void openapi_lands_as_operations_on_the_external_system() throws Exception {
        loadSampleCopy();
        var contract = new java.io.File("src/test/resources/easytravel-mini.yaml").getAbsolutePath();

        openApiExternal.handle(new ImportOpenApiExternalCommand("ext-rumbo", contract));
        var operations = rumbo().useCases();
        assertTrue(operations.stream().anyMatch(u -> u.id().equals("xuc-rumbo-book-hotel")),
                "cada operación del contrato es una operación del sistema externo");
        var bookHotel = operations.stream()
                .filter(u -> u.id().equals("xuc-rumbo-book-hotel")).findFirst().orElseThrow();
        assertTrue(bookHotel.description().contains("POST"), "method + path como descripción");

        // re-import: update in place, never duplicate
        var before = operations.size();
        openApiExternal.handle(new ImportOpenApiExternalCommand("ext-rumbo", contract));
        assertEquals(before, rumbo().useCases().size());
    }

    @Test
    void wsdl_lands_as_operations_on_the_external_system() throws Exception {
        loadSampleCopy();
        var contract = new java.io.File("src/test/resources/legacy-pms.wsdl").getAbsolutePath();

        wsdl.handle(new ImportWsdlCommand(contract, "ext-rumbo", null));
        var obtener = rumbo().useCases().stream()
                .filter(u -> u.id().equals("xuc-rumbo-obtener-reserva")).findFirst().orElseThrow();
        assertEquals("ObtenerReserva", obtener.name());
        assertTrue(obtener.description().contains("SOAP PmsPort.ObtenerReserva"));
        assertTrue(obtener.description().contains("localizador"),
                "la documentation del WSDL viaja en la descripción");

        var before = rumbo().useCases().size();
        wsdl.handle(new ImportWsdlCommand(contract, "ext-rumbo", null));
        assertEquals(before, rumbo().useCases().size(), "re-import actualiza, no duplica");
    }

    @Test
    void wsdl_lands_as_use_case_stubs_on_a_module() throws Exception {
        loadSampleCopy();
        var contract = new java.io.File("src/test/resources/legacy-pms.wsdl").getAbsolutePath();

        wsdl.handle(new ImportWsdlCommand(contract, null, "mod-distribution"));
        var stub = repository.findById("uc-ObtenerReserva", UseCaseEntity.class).orElseThrow();
        assertTrue(stub.steps().isEmpty(), "stub: el desarrollador implementa el comportamiento");
        assertTrue(stub.mcpDescription().contains("SOAP PmsPort.ObtenerReserva"));
        var module = repository.findById("mod-distribution", ModuleEntity.class).orElseThrow();
        assertTrue(module.useCaseIds().contains("uc-ObtenerReserva"));
    }

    @Test
    void exactly_one_target_is_required() throws Exception {
        loadSampleCopy();
        var contract = new java.io.File("src/test/resources/legacy-pms.wsdl").getAbsolutePath();
        assertThrows(IllegalArgumentException.class,
                () -> wsdl.handle(new ImportWsdlCommand(contract, "ext-rumbo", "mod-distribution")));
        assertThrows(IllegalArgumentException.class,
                () -> wsdl.handle(new ImportWsdlCommand(contract, null, null)));
    }
}
