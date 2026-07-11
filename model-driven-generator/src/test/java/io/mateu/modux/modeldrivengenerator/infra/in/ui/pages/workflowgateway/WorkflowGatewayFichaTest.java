package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * The gateway's ficha edits the SAME semantics the diagram toggles: load, edit,
 * save, and the type/semantics pair validated — through the CRUD adapter, like
 * the Mateu binder would drive it.
 */
@SpringBootTest
class WorkflowGatewayFichaTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ApplicationContext context;

    @Autowired
    CommonFileRepository repository;

    @Test
    void the_ficha_edits_the_semantics_and_validates_the_pair() throws Exception {
        var dir = Files.createTempDirectory("gateway-ficha");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        repository.save(new WorkflowGatewayEntity("gw-1", "Join uno", "JOIN", List.of(), List.of()));

        var adapter = context.getBean(WorkflowGatewayCrudAdapter.class);
        var editor = adapter.getEditor("gw-1", null);
        assertThat(editor.type).isEqualTo(GatewayType.JOIN);
        assertThat(editor.semantics).isNull();

        // la ficha cambia la semántica del join a CUALQUIERA
        editor.semantics = GatewaySemantics.ANY;
        editor.save(null);
        assertThat(repository.findById("gw-1", WorkflowGatewayEntity.class).orElseThrow().semantics())
                .isEqualTo("ANY");

        // el par tipo/semántica se valida: EXCLUSIVE no es de un join
        editor.semantics = GatewaySemantics.EXCLUSIVE;
        assertThatThrownBy(() -> editor.save(null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("JOIN");

        // vacío devuelve al comportamiento por defecto
        editor.semantics = null;
        editor.save(null);
        assertThat(repository.findById("gw-1", WorkflowGatewayEntity.class).orElseThrow().semantics())
                .isNull();

        // el alta desde la ficha también pasa por la validación
        var creation = adapter.getCreationForm(null);
        creation.id = "gw-2";
        creation.name = "Split dos";
        creation.type = GatewayType.SPLIT;
        creation.semantics = GatewaySemantics.EXCLUSIVE;
        creation.create(null);
        assertThat(repository.findById("gw-2", WorkflowGatewayEntity.class).orElseThrow().semantics())
                .isEqualTo("EXCLUSIVE");

        repository.deleteAllById(List.of("gw-1", "gw-2"), WorkflowGatewayEntity.class);
    }
}
