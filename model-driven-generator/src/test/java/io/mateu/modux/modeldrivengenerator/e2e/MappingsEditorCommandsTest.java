package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The mappings map through the editor API: fields live on the model (add, rename,
 * move, remove — removing prunes the rules that used them), rules join two fields
 * of mapped models, and a transformation takes models/fields in and produces a
 * model or field out.
 */
@SpringBootTest
class MappingsEditorCommandsTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    EditorApiController controller;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void fields_rules_and_transformations_are_authored_on_the_mappings_map() throws Exception {
        var dir = Files.createTempDirectory("mappings-editor-commands");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());

        // ── two models, with fields ─────────────────────────────────────────
        apply("""
                {"kind":"add-model","id":"test-m1","name":"ReservaForm"}""");
        apply("""
                {"kind":"add-model","id":"test-m2","name":"BookRq"}""");
        apply("""
                {"kind":"add-model-field","modelId":"test-m1","fieldId":"f-nombre","name":"nombre"}""");
        apply("""
                {"kind":"add-model-field","modelId":"test-m1","fieldId":"f-noches","name":"noches","type":"integer"}""");
        apply("""
                {"kind":"add-model-field","modelId":"test-m2","fieldId":"f-guest","name":"guestName"}""");

        var model = controller.model();
        var m1 = model.models().stream().filter(m -> "test-m1".equals(m.id())).findFirst().orElseThrow();
        assertThat(m1.fields()).extracting("id").containsExactly("f-nombre", "f-noches");
        assertThat(m1.fields().get(1).type()).isEqualTo("integer");

        // ── rename ──────────────────────────────────────────────────────────
        apply("""
                {"kind":"set-model-field","modelId":"test-m1","fieldId":"f-nombre","name":"nombreCompleto"}""");
        model = controller.model();
        m1 = model.models().stream().filter(m -> "test-m1".equals(m.id())).findFirst().orElseThrow();
        assertThat(m1.fields().get(0).name()).isEqualTo("nombreCompleto");

        // ── a mapping and a field-to-field rule ─────────────────────────────
        apply("""
                {"kind":"add-model-mapping","id":"test-mm","name":"Form2Rq","sourceId":"test-m1","targetId":"test-m2"}""");
        apply("""
                {"kind":"add-model-mapping-rule","id":"test-mm","sourceId":"f-nombre","targetId":"f-guest"}""");
        model = controller.model();
        var mm = model.modelMappings().stream().filter(x -> "test-mm".equals(x.id())).findFirst().orElseThrow();
        assertThat(mm.rules()).hasSize(1);
        assertThat(mm.rules().get(0).sourceFieldId()).isEqualTo("f-nombre");
        assertThat(mm.rules().get(0).targetFieldId()).isEqualTo("f-guest");

        // ── removing a mapped field prunes its rules ────────────────────────
        apply("""
                {"kind":"remove-model-field","modelId":"test-m1","fieldId":"f-nombre"}""");
        model = controller.model();
        mm = model.modelMappings().stream().filter(x -> "test-mm".equals(x.id())).findFirst().orElseThrow();
        assertThat(mm.rules()).isEmpty();

        // ── moving a field changes model ────────────────────────────────────
        apply("""
                {"kind":"move-model-field","modelId":"test-m1","fieldId":"f-noches","targetId":"test-m2"}""");
        model = controller.model();
        m1 = model.models().stream().filter(m -> "test-m1".equals(m.id())).findFirst().orElseThrow();
        var m2 = model.models().stream().filter(m -> "test-m2".equals(m.id())).findFirst().orElseThrow();
        assertThat(m1.fields()).isEmpty();
        assertThat(m2.fields()).extracting("id").containsExactly("f-guest", "f-noches");

        // ── the transformation: inputs in, one output out ───────────────────
        apply("""
                {"kind":"add-transformation","id":"test-tf","name":"Concat"}""");
        apply("""
                {"kind":"add-transformation-input","id":"test-tf","modelId":"test-m2","fieldId":"f-guest"}""");
        apply("""
                {"kind":"add-transformation-input","id":"test-tf","modelId":"test-m1"}""");
        apply("""
                {"kind":"set-transformation-output","id":"test-tf","modelId":"test-m2","fieldId":"f-noches"}""");
        model = controller.model();
        var tf = model.transformations().stream().filter(t -> "test-tf".equals(t.id())).findFirst().orElseThrow();
        assertThat(tf.inputs()).hasSize(2);
        assertThat(tf.output().fieldId()).isEqualTo("f-noches");

        apply("""
                {"kind":"remove-transformation-input","id":"test-tf","modelId":"test-m1"}""");
        apply("""
                {"kind":"set-transformation-output","id":"test-tf"}""");
        model = controller.model();
        tf = model.transformations().stream().filter(t -> "test-tf".equals(t.id())).findFirst().orElseThrow();
        assertThat(tf.inputs()).hasSize(1);
        assertThat(tf.output()).isNull();

        // ── teardown ────────────────────────────────────────────────────────
        apply("""
                {"kind":"remove-transformation","id":"test-tf"}""");
        apply("""
                {"kind":"remove-model-mapping","id":"test-mm"}""");
        apply("""
                {"kind":"remove-model","id":"test-m1"}""");
        apply("""
                {"kind":"remove-model","id":"test-m2"}""");
        model = controller.model();
        assertThat(model.transformations()).noneMatch(t -> "test-tf".equals(t.id()));
        assertThat(model.models()).noneMatch(m -> m.id().startsWith("test-m"));
    }

    private void apply(String commandJson) throws Exception {
        controller.apply(mapper.readValue(commandJson, EditorApiController.EditorCommand.class));
    }
}
