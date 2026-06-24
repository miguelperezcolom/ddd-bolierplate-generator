package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * End-to-end test of the generator. It builds a fixture model (the hotel store plus a couple of
 * flows and a FORM page), generates the whole project, then:
 * <ul>
 *   <li>compiles every generated Maven project (proving spec → code → compiles, including the
 *       flow-derived code);</li>
 *   <li>validates every generated EventConductor workflow and form JSON against the structural
 *       requirements of EventConductor's schemas.</li>
 * </ul>
 * Slow and requiring a Maven toolchain, so it is tagged {@code e2e} and excluded from the normal
 * build. Run with: {@code mvn test -Pe2e}.
 */
@SpringBootTest
@Tag("e2e")
class GenerationE2ETest {

    static {
        System.setProperty("modux.model-file",
                new File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    private static final Set<String> WORKFLOW_STEP_TYPES =
            Set.of("ACTION", "JOIN", "FORK", "END", "USER_TASK", "PROCESS");
    private static final Set<String> FORM_DATA_TYPES = Set.of(
            "integer", "string", "number", "date", "time", "dateTime", "bool", "array", "file",
            "status", "money", "component", "menu", "range", "action", "actionGroup", "dateRange");

    private static final String FIXTURE_EXTRA = """

            flows:
            - id: "e2e-flow-mat"
              name: "ReservaEnHousekeepingE2E"
              archetype: "MATERIALIZES"
              triggerAggregateId: "reserva"
              triggerEvent: "ReservaMaterializadaE2E"
              targetModuleId: "mod-housekeeping"
              readModelName: "ReservaHousekeepingE2E"
              materializedFields:
              - "localizador"
              - "titular"
            - id: "e2e-flow-orch"
              name: "ProcesoCheckinE2E"
              archetype: "ORCHESTRATES"
              triggerAggregateId: "reserva"
              triggerEvent: "CheckinIniciadoE2E"
              targetModuleId: "mod-housekeeping"
              materializedFields: []
            pages:
            - id: "e2e-page-form"
              name: "CheckinFormE2E"
              route: "/checkin-e2e"
              type: "FORM"
              aggregateId: "reserva"
              modelId: "habitacion"
            """;

    @Autowired
    GenerateCodeUseCase generateCodeUseCase;

    @Autowired
    CommonFileRepository repository;

    private final ObjectMapper json = new ObjectMapper();

    @Test
    void generates_compiles_and_validates_flows_and_eventconductor() throws Exception {
        // 1. build a fixture store = hotel + flows + a FORM page, and load it
        var hotelStore = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var fixture = Files.createTempFile("modux-e2e-store", ".yaml");
        Files.writeString(fixture, hotelStore + FIXTURE_EXTRA);
        repository.loadFrom(fixture.toAbsolutePath().toString());

        // 2. generate the project
        var output = Files.createTempDirectory("modux-e2e");
        generateCodeUseCase.handle(new GenerateCodeCommand("hotel-checkin", output.toString(), null, false));

        // 3. compile every generated Maven project (includes the flow-derived code)
        List<Path> mavenProjects;
        try (Stream<Path> top = Files.list(output)) {
            mavenProjects = top.filter(Files::isDirectory)
                    .filter(p -> Files.exists(p.resolve("pom.xml")))
                    .sorted().toList();
        }
        assertFalse(mavenProjects.isEmpty(), "generation produced no Maven projects under " + output);
        for (Path project : mavenProjects) {
            assertEquals(0, compile(project), "generated project did not compile: " + project.getFileName());
        }

        // 4. flow-derived code is present (materializes → a read model in the target context)
        assertTrue(anyFileMatches(output, "ReservaHousekeepingE2EReadModelEntity.java"),
                "materializes flow did not produce its read model");

        // 5. every generated EventConductor workflow / form validates structurally
        var workflows = findFiles(output, ".workflow.json");
        var forms = findFiles(output, ".form.json");
        assertFalse(workflows.isEmpty(), "no EventConductor workflow definitions were generated");
        assertFalse(forms.isEmpty(), "no EventConductor form definitions were generated");
        for (Path wf : workflows) {
            validateWorkflow(json.readTree(wf.toFile()), wf);
        }
        for (Path form : forms) {
            validateForm(json.readTree(form.toFile()), form);
        }
    }

    private void validateWorkflow(JsonNode wf, Path file) {
        assertTrue(wf.path("name").isTextual(), "workflow missing name: " + file);
        var steps = wf.path("steps");
        assertTrue(steps.isArray() && steps.size() >= 1, "workflow has no steps: " + file);
        for (JsonNode step : steps) {
            assertTrue(step.path("id").isTextual(), "step missing id in " + file);
            assertTrue(step.path("name").isTextual(), "step missing name in " + file);
            var type = step.path("type").asText();
            assertTrue(WORKFLOW_STEP_TYPES.contains(type), "bad step type '" + type + "' in " + file);
            if (type.equals("ACTION")) {
                assertTrue(step.path("topic").isTextual(), "ACTION step missing topic in " + file);
            }
        }
    }

    private void validateForm(JsonNode form, Path file) {
        assertTrue(form.path("name").isTextual(), "form missing name: " + file);
        var fields = form.path("fields");
        assertTrue(fields.isArray() && fields.size() >= 1, "form has no fields: " + file);
        for (JsonNode field : fields) {
            assertTrue(field.path("id").isTextual(), "field missing id in " + file);
            assertTrue(field.path("label").isTextual(), "field missing label in " + file);
            var dt = field.path("dataType").asText();
            assertTrue(FORM_DATA_TYPES.contains(dt), "bad field dataType '" + dt + "' in " + file);
        }
    }

    private static List<Path> findFiles(Path root, String suffix) throws Exception {
        try (Stream<Path> walk = Files.walk(root)) {
            return walk.filter(p -> p.getFileName().toString().endsWith(suffix)).sorted().toList();
        }
    }

    private static boolean anyFileMatches(Path root, String fileName) throws Exception {
        try (Stream<Path> walk = Files.walk(root)) {
            return walk.anyMatch(p -> p.getFileName().toString().equals(fileName));
        }
    }

    private int compile(Path projectDir) throws Exception {
        var mvn = System.getProperty("os.name", "").toLowerCase().contains("win") ? "mvn.cmd" : "mvn";
        var process = new ProcessBuilder(mvn, "-q", "-B", "-DskipTests", "compile")
                .directory(projectDir.toFile())
                .redirectErrorStream(true)
                .inheritIO()
                .start();
        return process.waitFor();
    }
}
