package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Code modules through the editor API: a bounded context DISTRIBUTES its elements
 * into modules, an element lives in one module of its BC (assigning moves it), and
 * the service says where a module DEPLOYS — authored with commands and read back
 * from the /model snapshot.
 */
@SpringBootTest
class CodeModuleCommandsTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    EditorApiController controller;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void a_bounded_context_distributes_its_elements_into_modules_and_services_deploy_them() throws Exception {
        var dir = Files.createTempDirectory("code-module-commands");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());

        apply("""
                {"kind":"add-module","id":"test-mod","name":"Reservas"}""");
        apply("""
                {"kind":"add-aggregate","id":"test-agg","name":"Reserva","moduleId":"test-mod"}""");
        apply("""
                {"kind":"add-use-case","id":"test-uc","name":"Reservar","moduleId":"test-mod"}""");
        repository.save(ServiceEntity.builder().id("test-svc").name("reservas-svc").build());

        // ── two modules distribute the BC's elements ─────────────────────────
        apply("""
                {"kind":"add-code-module","id":"test-cm-core","name":"core","moduleId":"test-mod"}""");
        apply("""
                {"kind":"add-code-module","id":"test-cm-api","name":"api","moduleId":"test-mod"}""");
        apply("""
                {"kind":"add-code-module-element","id":"test-cm-core","elementId":"test-agg"}""");
        apply("""
                {"kind":"add-code-module-element","id":"test-cm-core","elementId":"test-uc"}""");
        apply("""
                {"kind":"add-service-code-module","serviceId":"test-svc","id":"test-cm-core"}""");

        var model = controller.model();
        var core = model.codeModules().stream().filter(c -> "test-cm-core".equals(c.id())).findFirst().orElseThrow();
        assertThat(core.moduleId()).isEqualTo("test-mod");
        assertThat(core.elementIds()).containsExactly("test-agg", "test-uc");
        var svc = model.services().stream().filter(s -> "test-svc".equals(s.id())).findFirst().orElseThrow();
        assertThat(svc.codeModuleIds()).containsExactly("test-cm-core");

        // ── an element lives in ONE module of its BC: assigning moves it ─────
        apply("""
                {"kind":"add-code-module-element","id":"test-cm-api","elementId":"test-uc"}""");
        model = controller.model();
        core = model.codeModules().stream().filter(c -> "test-cm-core".equals(c.id())).findFirst().orElseThrow();
        var api = model.codeModules().stream().filter(c -> "test-cm-api".equals(c.id())).findFirst().orElseThrow();
        assertThat(core.elementIds()).containsExactly("test-agg");
        assertThat(api.elementIds()).containsExactly("test-uc");

        // ── removing a module: the service lets go, elements become undistributed ──
        apply("""
                {"kind":"remove-code-module-element","id":"test-cm-api","elementId":"test-uc"}""");
        apply("""
                {"kind":"remove-code-module","id":"test-cm-core"}""");
        model = controller.model();
        assertThat(model.codeModules()).noneMatch(c -> "test-cm-core".equals(c.id()));
        svc = model.services().stream().filter(s -> "test-svc".equals(s.id())).findFirst().orElseThrow();
        assertThat(svc.codeModuleIds()).isEmpty();
        api = model.codeModules().stream().filter(c -> "test-cm-api".equals(c.id())).findFirst().orElseThrow();
        assertThat(api.elementIds()).isEmpty();

        // teardown
        apply("""
                {"kind":"remove-code-module","id":"test-cm-api"}""");
        repository.deleteAllById(List.of("test-svc"), ServiceEntity.class);
    }

    private void apply(String commandJson) throws Exception {
        controller.apply(mapper.readValue(commandJson, EditorApiController.EditorCommand.class));
    }
}
