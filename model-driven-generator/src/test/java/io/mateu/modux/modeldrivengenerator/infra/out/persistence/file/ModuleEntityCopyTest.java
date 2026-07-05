package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Copy-with-changes must preserve every field — including the ones added after the copying code
 * was written. That is exactly what the positional compat constructors cannot guarantee (the bug
 * shipped three times: DerivePageUseCases, ImportOpenApiInbound, FlowStoreMaterializer), so copies
 * go through {@code toBuilder()}.
 */
class ModuleEntityCopyTest {

    @Test
    void toBuilder_copy_preserves_fields_the_copying_code_does_not_know_about() throws Exception {
        var module = new ObjectMapper().readValue("""
                {"id":"mod-reservas","name":"Reservas","subdomainType":"CORE",
                 "description":"SoR de la reserva","decisionIds":["d1"],
                 "readSideModuleId":"mod-dispo","readSideVia":"CDC",
                 "useCaseIds":["uc-old"]}""", ModuleEntity.class);

        var copy = module.toBuilder().useCaseIds(List.of("uc-old", "uc-new")).build();

        assertEquals(List.of("uc-old", "uc-new"), copy.useCaseIds());
        // the fields a stale positional copy would silently null
        assertEquals("mod-dispo", copy.readSideModuleId());
        assertEquals("CDC", copy.readSideVia());
        assertEquals("SoR de la reserva", copy.description());
        assertEquals(List.of("d1"), copy.decisionIds());
        assertEquals(module.subdomainType(), copy.subdomainType());
    }
}
