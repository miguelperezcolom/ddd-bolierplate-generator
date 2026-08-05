package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * A workflow step says what kind of step it is in EventConductor's words.
 *
 * <p>The two vocabularies had drifted apart — modux said {@code TASK}/{@code SPLIT}, the engine
 * says {@code ACTION}/{@code FORK} — and the generator hid it by emitting {@code ACTION} for
 * everything. That is the failure this pins down: a HUMAN step, one with somebody assigned to it,
 * was handed to the engine as automated work, and nothing anywhere said so.
 */
@SpringBootTest
class WorkflowStepTypeAdoptionTest {

    @Autowired CommonFileRepository repository;

    private static Path modelWith(Path tmp, String steps) throws Exception {
        var model = tmp.resolve("modux");
        Files.createDirectories(model.resolve("workflows"));
        Files.writeString(model.resolve("index.yaml"),
                "formatVersion: 1\ncounts:\n  workflows: 1\n");
        Files.writeString(model.resolve("workflows/wf-1.yaml"),
                "id: wf-1\nname: Checkin\nsteps:\n" + steps);
        return model;
    }

    private WorkflowEntity load(Path model) {
        repository.loadFrom(model.toString());
        return repository.findById("wf-1", WorkflowEntity.class).orElseThrow();
    }

    @Test
    void aStepWithSomebodyAssignedIsAUserTask(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Revisar
                    roleId: act-recepcion
                """);

        var workflow = load(model);

        assertThat(workflow.steps().get(0).type()).isEqualTo("USER_TASK");
    }

    @Test
    void aStepWithAFormIsAUserTaskToo(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Rellenar
                    formPageId: pg-form
                """);

        assertThat(load(model).steps().get(0).type()).isEqualTo("USER_TASK");
    }

    @Test
    void aStepWithNobodyAssignedIsAnAction(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Cobrar
                    type: TASK
                """);

        assertThat(load(model).steps().get(0).type()).isEqualTo("ACTION");
    }

    /** modux called it SPLIT; the engine calls it FORK. Same thing, one name. */
    @Test
    void aSplitBecomesAFork(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Abrir ramas
                    type: SPLIT
                """);

        assertThat(load(model).steps().get(0).type()).isEqualTo("FORK");
    }

    /** A step that already speaks EventConductor is left exactly as it is. */
    @Test
    void aStepThatAlreadySpeaksTheEnginesLanguageIsUntouched(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Esperar
                    type: WAIT_FOR_MESSAGE
                    roleId: act-recepcion
                """);

        // note the role: the adoption must NOT overrule an explicit type
        assertThat(load(model).steps().get(0).type()).isEqualTo("WAIT_FOR_MESSAGE");
    }

    @Test
    void migratesOnce(@TempDir Path tmp) throws Exception {
        var model = modelWith(tmp, """
                  - id: s1
                    name: Revisar
                    roleId: act-recepcion
                """);
        load(model);
        repository.save(repository.findById("wf-1", WorkflowEntity.class).orElseThrow());

        assertThat(load(model).steps().get(0).type()).isEqualTo("USER_TASK");
    }
}
