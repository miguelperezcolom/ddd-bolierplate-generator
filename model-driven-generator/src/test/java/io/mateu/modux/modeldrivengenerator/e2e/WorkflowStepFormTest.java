package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * The FORM of a human task: a workflow step declares the PAGE the forms
 * engine renders when the task lands on someone's worklist.
 */
@SpringBootTest
class WorkflowStepFormTest {

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
    void human_step_declares_its_form_page_and_survives_updates() throws Exception {
        var dir = Files.createTempDirectory("workflow-step-form");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        apply("""
                {"kind":"add-workflow","id":"wf-alta","name":"Alta","completionEventName":"AltaDone"}""");
        apply("""
                {"kind":"add-workflow-step","workflowId":"wf-alta","id":"st-rev","name":"Revisar",
                 "roleId":"role-backoffice","deadline":"PT48H"}""");
        apply("""
                {"kind":"create-ui-page","id":"page-rev","name":"Revisión"}""");

        // the page must exist
        assertThatThrownBy(() -> apply("""
                {"kind":"set-workflow-step-form","workflowId":"wf-alta","id":"st-rev",
                 "targetId":"no-such-page"}"""))
                .isInstanceOf(IllegalArgumentException.class);

        apply("""
                {"kind":"set-workflow-step-form","workflowId":"wf-alta","id":"st-rev",
                 "targetId":"page-rev"}""");
        var step = repository.findById("wf-alta", WorkflowEntity.class).orElseThrow()
                .steps().getFirst();
        assertThat(step.formPageId()).isEqualTo("page-rev");

        // updating the step's events must NOT wipe the human fields nor the form
        apply("""
                {"kind":"update-workflow-step","workflowId":"wf-alta","id":"st-rev",
                 "emittedEventName":"StartRevisar"}""");
        step = repository.findById("wf-alta", WorkflowEntity.class).orElseThrow()
                .steps().getFirst();
        assertThat(step.emittedEventName()).isEqualTo("StartRevisar");
        assertThat(step.roleId()).isEqualTo("role-backoffice");
        assertThat(step.deadline()).isEqualTo("PT48H");
        assertThat(step.formPageId()).isEqualTo("page-rev");

        // null clears
        apply("""
                {"kind":"set-workflow-step-form","workflowId":"wf-alta","id":"st-rev"}""");
        step = repository.findById("wf-alta", WorkflowEntity.class).orElseThrow()
                .steps().getFirst();
        assertThat(step.formPageId()).isNull();
    }
}
