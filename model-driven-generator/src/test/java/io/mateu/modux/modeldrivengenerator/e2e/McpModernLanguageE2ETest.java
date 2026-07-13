package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.mcp.ModelMcpTools;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The AI path speaks TODAY's language: an insurer's claims domain authored over
 * MCP using the current metamodel — invariants ON the aggregate, a workflow
 * with a HUMAN task (role, deadline, form page), a loose exclusive gateway
 * with branch conditions, and hand-written code as a first-class element.
 */
@SpringBootTest
class McpModernLanguageE2ETest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ModelMcpTools tools;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void claims_domain_uses_workflows_human_tasks_gateways_and_custom_code() throws Exception {
        var dir = Files.createTempDirectory("mcp-modern");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());

        call("bootstrap_project", """
                {"projectId":"aseguradora","name":"Aseguradora","packageName":"com.aseg",
                 "outputPath":"%s","serviceId":"svc-siniestros",
                 "objective":"Tramitación de siniestros con peritaje humano.",
                 "boundedContexts":[{"id":"mod-siniestros","name":"Siniestros","subdomainType":"CORE",
                   "description":"Apertura, peritaje y liquidación de siniestros."}]}"""
                .formatted(dir.resolve("out").toAbsolutePath()));

        // el agregado declara sus invariantes — su razón de existir
        call("upsert_element", """
                {"type":"aggregates","element":{"id":"agg-siniestro","name":"Siniestro",
                 "invariants":[
                   {"id":"inv-capital","name":"No se paga más que el capital asegurado","conditions":[]},
                   {"id":"inv-cerrado","name":"Un siniestro cerrado no admite gastos","conditions":[]}]}}""");
        var agg = repository.findById("agg-siniestro", AggregateEntity.class).orElseThrow();
        assertEquals(2, agg.invariants().size());

        // el peritaje: workflow con tarea humana completa (rol, plazo, formulario)
        call("upsert_element", """
                {"type":"roles","element":{"id":"role-perito","name":"Perito"}}""");
        call("upsert_element", """
                {"type":"pages","element":{"id":"page-peritaje","name":"Informe de peritaje","route":"/peritaje"}}""");
        call("upsert_element", """
                {"type":"workflows","element":{"id":"wf-tramitacion","name":"Tramitación de siniestro",
                 "onCompletionEventName":"SiniestroTramitado",
                 "steps":[
                   {"id":"st-validar","name":"Validar cobertura"},
                   {"id":"st-peritar","name":"Peritar","dependsOnStepIds":["st-validar"],
                    "roleId":"role-perito","deadline":"PT72H","escalationRoleId":"role-perito",
                    "formPageId":"page-peritaje"},
                   {"id":"st-liquidar","name":"Liquidar","dependsOnStepIds":["st-peritar"]}]}}""");
        var wf = repository.findById("wf-tramitacion", WorkflowEntity.class).orElseThrow();
        var peritar = wf.steps().stream().filter(s -> s.id().equals("st-peritar")).findFirst().orElseThrow();
        assertEquals("role-perito", peritar.roleId());
        assertEquals("page-peritaje", peritar.formPageId());
        assertEquals("PT72H", peritar.deadline());

        // split exclusivo suelto con condiciones por rama
        call("upsert_element", """
                {"type":"workflowGateways","element":{"id":"gw-importe","name":"¿Importe alto?",
                 "type":"SPLIT","semantics":"EXCLUSIVE",
                 "sourceIds":["st-validar"],"targetIds":["st-peritar"],
                 "branchConditions":[{"targetId":"st-peritar","expression":"importe > 3000"}]}}""");
        var gw = repository.findById("gw-importe", WorkflowGatewayEntity.class).orElseThrow();
        assertEquals("importe > 3000", gw.branchConditions().getFirst().expression());

        // código a mano como elemento de primera clase
        call("upsert_element", """
                {"type":"customCodes","element":{"id":"cc-baremo","name":"Cálculo de baremo",
                 "language":"java","description":"aplica el baremo oficial de indemnizaciones"}}""");
        assertTrue(repository.findById("cc-baremo", CustomCodeEntity.class).isPresent());

        // el linter entiende el resultado (no revienta con el lenguaje nuevo)
        var lint = call("lint_model", "{}");
        assertTrue(lint != null && !lint.isBlank());

        // y el catálogo genérico ve TODOS los tipos del lenguaje actual
        var types = call("list_element_types", "{}");
        for (var t : new String[]{"workflows", "workflowGateways", "customCodes",
                "transformations", "etlFlows", "aiAgents", "rags", "mcpGateways",
                "buttonGroups", "modules", "identityProviders"}) {
            assertTrue(types.contains(t), "missing type: " + t);
        }
    }

    private String call(String tool, String argumentsJson) throws Exception {
        var text = tools.call(tool, mapper.readTree(argumentsJson));
        assertTrue(text != null && !text.startsWith("Error"), tool + " failed: " + text);
        return text;
    }
}
