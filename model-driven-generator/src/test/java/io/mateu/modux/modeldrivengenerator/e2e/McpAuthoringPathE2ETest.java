package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.mcp.ModelMcpTools;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * The self-test of the authoring path: builds a whole new domain (padel-court bookings) from an
 * EMPTY store through the MCP tools, exactly as an AI agent would — topology → models → aggregate
 * (lifecycle, invariant, CUSTOM operations with natural-language intent) → read side → relations
 * as intent (starter recipe + context map) — until the linter is clean, then generates the code
 * and asserts the interesting artifacts exist. If the path breaks anywhere (empty-store startup,
 * upsert feedback, recipes, lint, expansion, two-zone scaffolds), this test fails.
 */
@SpringBootTest
class McpAuthoringPathE2ETest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    ModelMcpTools tools;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void a_whole_domain_is_authored_from_scratch_over_mcp_and_generates() throws Exception {
        // an EMPTY store: authoring starts from nothing and the file appears on first save
        var dir = Files.createTempDirectory("mcp-authoring-path");
        var store = dir.resolve("model-driven-store.yaml");
        var output = dir.resolve("generated");
        repository.loadFrom(store.toAbsolutePath().toString());

        // ── paso 1: topología en una llamada (la entrada natural desde una descripción NL) ──
        var bootstrap = call("bootstrap_project", """
                {"projectId":"club","name":"Club de Pádel","packageName":"com.club.padel",
                 "outputPath":"%s","serviceId":"svc-club",
                 "objective":"Reservas de pistas de pádel: franjas de 90 minutos, sin solapes.",
                 "modules":[
                  {"id":"mod-reservas","name":"Reservas","subdomainType":"CORE",
                   "description":"Reserva de pistas: valida solapes y emite eventos de ocupación.",
                   "aggregateIds":["reserva-pista"],"domainEventIds":["ev-reserva-creada"],
                   "useCaseIds":["uc-reservar"]},
                  {"id":"mod-panel","name":"Panel","subdomainType":"SUPPORTING",
                   "description":"Ocupación del día para la recepción."}]}"""
                .formatted(output.toAbsolutePath()));
        assertTrue(bootstrap.contains("bootstrapped"), bootstrap);
        assertTrue(bootstrap.contains("Next (the authoring path)"), "bootstrap should teach the next step");

        // the cross-context relation is declared on the project (the lint message points here)
        call("upsert_element", """
                {"type":"projects","element":{"id":"club","name":"Club de Pádel",
                 "packageName":"com.club.padel","outputPath":"%s","serviceIds":["svc-club"],
                 "tenancyStrategy":"NONE",
                 "objective":"Reservas de pistas de pádel: franjas de 90 minutos, sin solapes.",
                 "contextMap":[{"id":"rel-reservas-panel","name":"Reservas publica ocupación al Panel",
                   "sourceModuleId":"mod-reservas","targetModuleId":"mod-panel","type":"OPEN_HOST_SERVICE"}]}}"""
                .formatted(output.toAbsolutePath()));

        // ── paso 2: modelos primero; el agregado, porque hay invariante y lifecycle ──
        call("upsert_element", """
                {"type":"models","element":{"id":"reserva-pista","name":"ReservaPista","fields":[
                 {"id":"socio","name":"socio","basicType":true,"type":"string"},
                 {"id":"pista","name":"pista","basicType":true,"type":"integer"},
                 {"id":"inicio","name":"inicio","basicType":true,"type":"dateTime"},
                 {"id":"estado","name":"estado","basicType":true,"type":"string"}]}}""");
        call("upsert_element", """
                {"type":"aggregates","element":{"id":"reserva-pista","name":"ReservaPista",
                 "modelId":"reserva-pista",
                 "operations":[
                  {"id":"op-reservar","name":"Reservar","type":"CUSTOM","emits":"ReservaPistaCreada",
                   "intent":"Crea la reserva si la pista está libre en esa franja de 90 minutos; si hay solape, rechaza con mensaje claro"},
                  {"id":"op-cancelar","name":"Cancelar","type":"CUSTOM",
                   "intent":"Cancela la reserva si faltan más de 2 horas para el inicio"}],
                 "invariants":[{"id":"inv-franja","name":"Franja válida","conditions":[
                  {"id":"c-90","expression":"duración == 90 minutos",
                   "errorMessage":"Las reservas son de 90 minutos exactos"}]}],
                 "lifecycle":{"stateField":"estado","initialState":"activa",
                  "states":["activa","cancelada"],
                  "transitions":[{"id":"t-cancelar","fromState":"activa","toState":"cancelada",
                   "operationId":"op-cancelar"}]}}}""");
        call("upsert_element", """
                {"type":"domainEvents","element":{"id":"ev-reserva-creada","name":"ReservaPistaCreada",
                 "modelId":"reserva-pista"}}""");
        call("upsert_element", """
                {"type":"useCases","element":{"id":"uc-reservar","name":"ReservarPista",
                 "exposedAsRest":true,"inputModelId":"reserva-pista","steps":[
                 {"id":"s-op","name":"reservar","type":"CallAggregateOperation",
                  "aggregateId":"reserva-pista","operationId":"op-reservar"},
                 {"id":"s-ev","name":"publicar","type":"PublishDomainEvent",
                  "domainEventId":"ev-reserva-creada"}]}}""");
        call("upsert_element", """
                {"type":"queryServices","element":{"id":"qs-reservas","name":"ReservasDelDia",
                 "moduleId":"mod-reservas","operations":[{"id":"qop-dia","name":"reservasDelDia",
                 "outputModelId":"reserva-pista"}]}}""");

        // ── paso 3: la relación entre módulos se declara como intención (receta) ──
        var recipe = call("apply_recipe", """
                {"recipe":"materialized-read-model","params":{
                 "id":"flow-ocupacion","name":"Ocupación del día",
                 "triggerAggregateId":"reserva-pista","triggerEvent":"ReservaPistaCreada",
                 "targetModuleId":"mod-panel","readModelName":"OcupacionDia",
                 "materializedFields":"pista, inicio, socio"}}""");
        assertTrue(recipe.contains("flow-ocupacion"), recipe);

        // ── cierre del bucle: modelo limpio ──────────────────────────────────
        assertEquals("Model check passed: no dangling references.", call("check_model", "{}"));
        assertEquals("Lint passed: no findings.", call("lint_model", "{}"));

        // ── y el código sale ─────────────────────────────────────────────────
        call("generate_code", """
                {"projectId":"club"}""");

        var scaffold = output.resolve(
                "club/club-custom/src/main/java/com/club/padel/custom/DefaultReservarReservaPistaOperation.java");
        assertTrue(Files.exists(scaffold), "two-zone scaffold missing: " + scaffold);
        var scaffoldSource = Files.readString(scaffold);
        assertTrue(scaffoldSource.contains("si hay solape, rechaza con mensaje claro"),
                "the natural-language intent must reach the scaffold:\n" + scaffoldSource);
        assertTrue(Files.exists(output.resolve(
                        "club/panel/src/main/java/com/club/padel/panel/infra/in/projection/OcupacionDiaProjection.java")),
                "the recipe's MATERIALIZES flow should expand into a projection in the target module");
        try (var files = Files.walk(output)) {
            var javaFiles = files.filter(f -> f.toString().endsWith(".java")).count();
            assertTrue(javaFiles > 40, "expected a full application, got " + javaFiles + " java files");
        }
    }

    private String call(String tool, String argumentsJson) throws Exception {
        var text = tools.call(tool, mapper.readTree(argumentsJson));
        assertTrue(text != null && !text.startsWith("Error"), tool + " failed: " + text);
        return text;
    }
}
