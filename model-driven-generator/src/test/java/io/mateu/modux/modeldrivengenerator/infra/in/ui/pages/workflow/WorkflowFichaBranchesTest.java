package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import java.nio.file.Files;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The workflow's ficha also edits the branch conditions of ITS exclusive
 * splits — membership inferred from the links, one row per branch.
 */
@SpringBootTest
class WorkflowFichaBranchesTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ApplicationContext context;

    @Autowired
    CommonFileRepository repository;

    @Autowired
    EditorApiController controller;

    final ObjectMapper mapper = new ObjectMapper();

    private void apply(String json) throws Exception {
        controller.apply(mapper.readValue(json, EditorApiController.EditorCommand.class));
    }

    @Test
    void the_workflow_ficha_edits_its_splits_branch_conditions() throws Exception {
        var dir = Files.createTempDirectory("workflow-ficha-branches");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        apply("""
                {"kind":"add-workflow","id":"wf-x","name":"X","completionEventName":"XDone"}""");
        apply("""
                {"kind":"add-workflow-step","workflowId":"wf-x","id":"x1","name":"Uno"}""");
        apply("""
                {"kind":"add-workflow-step","workflowId":"wf-x","id":"x2","name":"Dos"}""");
        apply("""
                {"kind":"add-workflow-gateway","id":"gw-x","name":"Elige","stepType":"SPLIT"}""");
        apply("""
                {"kind":"set-gateway-semantics","id":"gw-x","type":"EXCLUSIVE"}""");
        apply("""
                {"kind":"add-workflow-link","sourceId":"x1","targetId":"gw-x"}""");
        apply("""
                {"kind":"add-workflow-link","sourceId":"gw-x","targetId":"x2"}""");

        var adapter = context.getBean(WorkflowCrudAdapter.class);
        var editor = adapter.getEditor("wf-x", null);
        assertThat(editor.branchConditions).hasSize(1); // la rama gw-x → x2, inferida
        assertThat(editor.branchConditions.get(0).gateway).isEqualTo("Elige");
        editor.branchConditions.get(0).expression = "cantidad > 5";
        editor.save(null);
        assertThat(repository.findById("gw-x", WorkflowGatewayEntity.class).orElseThrow()
                .branchConditions().get(0).expression()).isEqualTo("cantidad > 5");
    }
}
