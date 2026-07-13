package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The FUSION: business processes become workflows — same id, linear chain,
 * human steps carrying role, deadline, escalation and compensation.
 */
@SpringBootTest
class ProcessFusionTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    EditorApiController controller;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    private void apply(String json) throws Exception {
        controller.apply(mapper.readValue(json, EditorApiController.EditorCommand.class));
    }

    @Test
    void processes_become_workflows_with_human_steps() throws Exception {
        var dir = Files.createTempDirectory("process-fusion");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        apply("""
                {"kind":"add-process","id":"proc-alta","name":"Alta de cliente",
                 "steps":[
                   {"id":"pa-1","name":"Validar datos","type":"AUTOMATED","useCaseId":"uc-validar"},
                   {"id":"pa-2","name":"Aprobar","type":"HUMAN","roleId":"role-backoffice",
                    "deadline":"PT48H","compensationUseCaseId":"uc-anular"}
                 ]}""");
        assertThat(repository.findById("proc-alta", ProcessEntity.class)).isPresent();

        apply("""
                {"kind":"migrate-processes-to-workflows"}""");

        assertThat(repository.findById("proc-alta", ProcessEntity.class)).isEmpty();
        var wf = repository.findById("proc-alta", WorkflowEntity.class).orElseThrow();
        assertThat(wf.name()).isEqualTo("Alta de cliente");
        assertThat(wf.steps()).hasSize(2);
        // cadena lineal: el segundo depende del primero
        assertThat(wf.steps().get(1).dependsOnStepIds()).containsExactly("pa-1");
        // el paso humano viaja completo
        var human = wf.steps().get(1);
        assertThat(human.roleId()).isEqualTo("role-backoffice");
        assertThat(human.deadline()).isEqualTo("PT48H");
        assertThat(human.compensationUseCaseId()).isEqualTo("uc-anular");
        // el automático conserva su use case
        assertThat(wf.steps().get(0).targetUseCaseId()).isEqualTo("uc-validar");

        // idempotente: repetir no duplica ni rompe
        apply("""
                {"kind":"migrate-processes-to-workflows"}""");
        assertThat(repository.findById("proc-alta", WorkflowEntity.class)).isPresent();
    }
}
