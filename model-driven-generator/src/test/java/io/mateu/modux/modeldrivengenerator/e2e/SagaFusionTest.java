package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The other half of the fusion: sagas become workflows — same id, the sequence
 * as a linear chain, compensation resolved onto each step, and the owning
 * context letting go (workflows live outside every context).
 */
@SpringBootTest
class SagaFusionTest {

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
    void sagas_become_workflows_with_compensation_on_the_step() throws Exception {
        var dir = Files.createTempDirectory("saga-fusion");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        apply("""
                {"kind":"add-boundedContext","id":"mod-s","name":"Pagos"}""");
        // saga de dos pasos + un paso de compensación puro, propiedad del módulo
        repository.save(new SagaEntity("saga-pago", "Cobro", 30000L, null,
                List.of("PagoSolicitado", "PagoReintentado"),
                List.of(
                        new SagaStepEntity("sg-1", "Reservar fondos", null, "sg-undo", null, null,
                                null, null, null, "uc-reservar", null),
                        new SagaStepEntity("sg-2", "Confirmar cobro", null, null, null, null,
                                null, null, null, "uc-confirmar", null),
                        new SagaStepEntity("sg-undo", "Liberar fondos", null, null, null, null,
                                null, null, null, "uc-liberar", null)),
                3, 1000L, "dlq-pagos", true));
        var boundedContext = repository.findById("mod-s",
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity.class).orElseThrow();
        repository.save(boundedContext.toBuilder().sagaIds(List.of("saga-pago")).build());

        apply("""
                {"kind":"migrate-sagas-to-workflows"}""");

        assertThat(repository.findById("saga-pago", SagaEntity.class)).isEmpty();
        var wf = repository.findById("saga-pago", WorkflowEntity.class).orElseThrow();
        assertThat(wf.triggerEvent()).isEqualTo("PagoSolicitado");
        assertThat(wf.description()).contains("PagoReintentado").contains("dlq-pagos");
        // el paso de compensación puro sale de la cadena; quedan los dos de negocio
        assertThat(wf.steps()).hasSize(2);
        assertThat(wf.steps().get(0).compensationUseCaseId()).isEqualTo("uc-liberar");
        assertThat(wf.steps().get(1).dependsOnStepIds()).containsExactly("sg-1");
        // el contexto suelta la saga
        var after = repository.findById("mod-s",
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity.class).orElseThrow();
        assertThat(after.sagaIds()).isEmpty();
    }
}
