package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aiagent.AiAgentCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup.ButtonGroupCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module.ModuleCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.customcode.CustomCodeCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.etlflow.EtlFlowCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.externalsystem.ExternalSystemCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider.IdentityProviderCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider.IdpType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.mcpgateway.McpGatewayCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.rag.RagCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.transformation.TransformationCrudAdapter;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ButtonGroupEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlFlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IdentityProviderEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Every element the diagram can draw has a ficha now: create → edit → reload,
 * driven through each CRUD adapter like the Mateu binder would.
 */
@SpringBootTest
class NewFichasSmokeTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ApplicationContext context;

    @Autowired
    CommonFileRepository repository;

    @Test
    void every_new_ficha_creates_edits_and_reloads() throws Exception {
        var dir = Files.createTempDirectory("new-fichas");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());
        repository.save(new ProjectEntity("proj-1", "Proyecto", null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                List.of(), null));

        // custom code
        var cc = context.getBean(CustomCodeCrudAdapter.class).getCreationForm(null);
        setField(cc, "id", "cc-1");
        setField(cc, "name", "Normalizador");
        setField(cc, "language", "java");
        cc.create(null);
        var ccEd = context.getBean(CustomCodeCrudAdapter.class).getEditor("cc-1", null);
        setField(ccEd, "description", "normaliza importes");
        ccEd.save(null);
        assertThat(repository.findById("cc-1", CustomCodeEntity.class).orElseThrow().description())
                .isEqualTo("normaliza importes");

        // transformation, delegating in the custom code
        var tr = context.getBean(TransformationCrudAdapter.class).getCreationForm(null);
        setField(tr, "id", "tr-1");
        setField(tr, "name", "Externa2Interna");
        setField(tr, "customCodeId", "cc-1");
        tr.create(null);
        assertThat(repository.findById("tr-1", TransformationEntity.class).orElseThrow().customCodeId())
                .isEqualTo("cc-1");

        // button group with one button
        repository.save(new ButtonGroupEntity("bg-1", "Acciones", List.of(), List.of(), null));
        var bg = context.getBean(ButtonGroupCrudAdapter.class).getEditor("bg-1", null);
        setField(bg, "name", "Acciones rápidas");
        bg.save(null);
        assertThat(repository.findById("bg-1", ButtonGroupEntity.class).orElseThrow().name())
                .isEqualTo("Acciones rápidas");

        // etl flow
        var etl = context.getBean(EtlFlowCrudAdapter.class).getCreationForm(null);
        setField(etl, "id", "etl-1");
        setField(etl, "name", "Carga nocturna");
        etl.create(null);
        assertThat(repository.findById("etl-1", EtlFlowEntity.class)).isPresent();

        // code boundedContext
        var cm = context.getBean(ModuleCrudAdapter.class).getCreationForm(null);
        setField(cm, "id", "cm-1");
        setField(cm, "name", "reservas-core");
        cm.create(null);
        assertThat(repository.findById("cm-1", ModuleEntity.class)).isPresent();

        // identity provider (enum round-trips)
        var idp = context.getBean(IdentityProviderCrudAdapter.class).getCreationForm(null);
        setField(idp, "id", "idp-1");
        setField(idp, "name", "Keycloak corporativo");
        setField(idp, "type", IdpType.CORPORATE);
        setField(idp, "issuer", "https://idp.example.com");
        idp.create(null);
        assertThat(repository.findById("idp-1", IdentityProviderEntity.class).orElseThrow().type())
                .isEqualTo("CORPORATE");
        var idpEd = context.getBean(IdentityProviderCrudAdapter.class).getEditor("idp-1", null);
        assertThat(getField(idpEd, "type")).isEqualTo(IdpType.CORPORATE);

        // ai agent (external flag survives edits)
        var ag = context.getBean(AiAgentCrudAdapter.class).getCreationForm(null);
        setField(ag, "id", "ag-1");
        setField(ag, "name", "Copiloto reservas");
        setField(ag, "external", true);
        ag.create(null);
        var agEd = context.getBean(AiAgentCrudAdapter.class).getEditor("ag-1", null);
        setField(agEd, "description", "atiende consultas");
        agEd.save(null);
        var agent = repository.findById("ag-1", AiAgentEntity.class).orElseThrow();
        assertThat(agent.external()).isTrue();
        assertThat(agent.description()).isEqualTo("atiende consultas");

        // rag + mcp gateway
        var rag = context.getBean(RagCrudAdapter.class).getCreationForm(null);
        setField(rag, "id", "rag-1");
        setField(rag, "name", "Base normativa");
        rag.create(null);
        assertThat(repository.findById("rag-1", RagEntity.class)).isPresent();
        var gw = context.getBean(McpGatewayCrudAdapter.class).getCreationForm(null);
        setField(gw, "id", "gw-1");
        setField(gw, "name", "Tools de reservas");
        gw.create(null);
        assertThat(repository.findById("gw-1", McpGatewayEntity.class)).isPresent();

        // external system: nested in the project, full round trip
        var xsAdapter = context.getBean(ExternalSystemCrudAdapter.class);
        var xs = xsAdapter.getCreationForm(null);
        setField(xs, "id", "ext-pms");
        setField(xs, "name", "PMS");
        setField(xs, "owner", "Operaciones");
        xs.create(null);
        assertThat(xsAdapter.search(null, null, null, null).page().content())
                .anyMatch(r -> r.id().equals("ext-pms"));
        var xsEd = context.getBean(ExternalSystemCrudAdapter.class).getEditor("ext-pms", null);
        setField(xsEd, "description", "el PMS del hotel");
        xsEd.save(null);
        var stored = repository.findAllOfType(ProjectEntity.class).getFirst().externalSystems()
                .stream().filter(x -> x.id().equals("ext-pms")).findFirst().orElseThrow();
        assertThat(stored.description()).isEqualTo("el PMS del hotel");
        assertThat(stored.owner()).isEqualTo("Operaciones");
        context.getBean(ExternalSystemCrudAdapter.class).deleteAllById(List.of("ext-pms"), null);
        assertThat(repository.findAllOfType(ProjectEntity.class).getFirst().externalSystems())
                .noneMatch(x -> x.id().equals("ext-pms"));
    }

    private static void setField(Object target, String field, Object value) throws Exception {
        var f = target.getClass().getDeclaredField(field);
        f.setAccessible(true);
        f.set(target, value);
    }

    private static Object getField(Object target, String field) throws Exception {
        var f = target.getClass().getDeclaredField(field);
        f.setAccessible(true);
        return f.get(target);
    }
}
