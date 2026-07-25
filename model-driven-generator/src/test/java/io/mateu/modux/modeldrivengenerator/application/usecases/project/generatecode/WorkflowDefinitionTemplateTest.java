package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

import com.fasterxml.jackson.databind.ObjectMapper;
import freemarker.template.Configuration;
import org.junit.jupiter.api.Test;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The generated EventConductor workflow definition must carry the execution caps (matching the
 * engine's schema field names) and stay valid JSON whether or not they are set.
 */
class WorkflowDefinitionTemplateTest {

    private String render(Map<String, Object> model) throws Exception {
        var cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setClassForTemplateLoading(GenerateCodeUseCase.class, "/templates");
        cfg.setDefaultEncoding("UTF-8");
        var out = new StringWriter();
        cfg.getTemplate("workflow-definition.ftl").process(model, out);
        return out.toString();
    }

    private Map<String, Object> step(String id, String name, Integer maxSuccessfulExecutions) {
        var step = new HashMap<String, Object>();
        step.put("id", id);
        step.put("name", name);
        if (maxSuccessfulExecutions != null) step.put("maxSuccessfulExecutions", maxSuccessfulExecutions);
        return step;
    }

    private Map<String, Object> model(Integer defaultMaxStepExecutions, List<Map<String, Object>> steps) {
        var saga = new HashMap<String, Object>();
        saga.put("name", "MySaga");
        saga.put("version", 0);
        saga.put("maxRetries", 2);
        saga.put("timeoutMs", 0);
        if (defaultMaxStepExecutions != null) saga.put("defaultMaxStepExecutions", defaultMaxStepExecutions);
        saga.put("steps", steps);
        return Map.of("project", Map.of("name", "Demo"), "saga", saga);
    }

    @Test
    void emitsCapsWhenSet() throws Exception {
        var json = render(model(100, List.of(
                step("s1", "Step 1", 3),
                step("s2", "Step 2", null))));

        var node = new ObjectMapper().readTree(json); // fails if the template emitted invalid JSON
        assertThat(node.path("defaultMaxStepExecutions").asInt()).isEqualTo(100);
        assertThat(node.path("steps").get(0).path("maxSuccessfulExecutions").asInt()).isEqualTo(3);
        assertThat(node.path("steps").get(1).has("maxSuccessfulExecutions")).isFalse();
    }

    @Test
    void omitsCapsWhenUnsetAndStaysValidJson() throws Exception {
        var json = render(model(null, List.of(step("s1", "Step 1", null))));

        var node = new ObjectMapper().readTree(json);
        assertThat(node.has("defaultMaxStepExecutions")).isFalse();
        assertThat(node.path("steps").get(0).has("maxSuccessfulExecutions")).isFalse();
    }
}
