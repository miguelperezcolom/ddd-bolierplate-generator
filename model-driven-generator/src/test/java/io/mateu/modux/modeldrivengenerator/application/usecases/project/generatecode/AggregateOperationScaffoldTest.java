package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import freemarker.template.Configuration;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

/**
 * Phase 3 of {@code docs/design/operation-body.md}: the aggregate operation scaffold renders the
 * modeled body — control-flow nesting and each action — as an indented outline, so the modeled
 * steps guide the developer instead of a blind throw. Everything is a {@code //} comment plus the
 * throw, so the scaffold always compiles until the body is completed.
 */
class AggregateOperationScaffoldTest {

    private String render(Map<String, Object> model) throws Exception {
        var cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setClassForTemplateLoading(getClass(), "/templates");
        cfg.setDefaultEncoding("UTF-8");
        var out = new StringWriter();
        cfg.getTemplate("aggregate-operation-default.ftl").process(model, out);
        return out.toString();
    }

    private Map<String, Object> baseModel(List<Map<String, Object>> steps) {
        return Map.of(
                "project", Map.of("packageName", "com.acme"),
                "module", Map.of("name", "Reservas"),
                "aggregate", Map.of("name", "Reserva"),
                "operation", Map.of("name", "confirmar", "intent", "Confirma la reserva"),
                "steps", steps);
    }

    @Test
    void nested_control_flow_renders_as_an_indented_outline() throws Exception {
        var steps = List.<Map<String, Object>>of(
                Map.of("type", "CheckPrecondition", "name", "guard", "condition", "estaPendiente"),
                Map.of("type", "ForEach", "name", "loop", "itemVar", "h", "collection", "habitaciones",
                        "body", List.of(Map.of("type", "If", "name", "check", "condition", "h.ocupada",
                                "then", List.of(Map.of("type", "CallAggregateOperation", "name", "liberar")),
                                "elseBranch", List.of(Map.of("type", "Custom", "name", "mark", "intent", "marcar libre"))))));

        var out = render(baseModel(steps));

        assertTrue(out.contains("class DefaultConfirmarReservaOperation"), out);
        assertTrue(out.contains("precondition: estaPendiente"), out);
        assertTrue(out.contains("for (h : habitaciones) {"), out);
        assertTrue(out.contains("if (h.ocupada) {"), out);
        assertTrue(out.contains("} else {"), out);
        assertTrue(out.contains("call operation liberar"), out);
        assertTrue(out.contains("custom: marcar libre"), out);
        // still a compiling scaffold: the throw stays until the body is implemented
        assertTrue(out.contains("throw new UnsupportedOperationException"), out);
        // nesting: the If (inside the loop body) is rendered after the ForEach header
        assertTrue(out.indexOf("if (h.ocupada)") > out.indexOf("for (h :"), out);
    }

    @Test
    void an_operation_without_steps_still_scaffolds_a_throw() throws Exception {
        var out = render(baseModel(List.of()));

        assertFalse(out.contains("Modeled body"), out);
        assertTrue(out.contains("throw new UnsupportedOperationException"), out);
    }

    @Test
    void an_explicit_modeled_body_generates_executable_control_flow_with_typed_hooks() throws Exception {
        // precondition estaPendiente; for h in habitaciones { if ocupada(h) liberar(h) }
        var liberar = node("call", "liberar", "context, h");
        var ifOcupada = node("if", "ocupada", "context, h");
        ifOcupada.put("then", List.of(liberar));
        var forEach = node("foreach", "habitaciones", "context");
        forEach.put("itemVar", "h");
        forEach.put("body", List.of(ifOcupada));
        var pre = node("precondition", "estaPendiente", "context");
        var body = List.of(pre, forEach);
        var hooks = List.of(
                hook("estaPendiente", "boolean"),
                hook("habitaciones", "Iterable<Object>"),
                hook("ocupada", "boolean", "h"),
                hook("liberar", "void", "h"));

        var model = new java.util.HashMap<String, Object>(baseModel(List.of()));
        model.put("executable", true);
        model.put("executableBody", Map.of("body", body, "hooks", hooks));
        var out = render(model);

        // real, compiling control-flow structure
        assertTrue(out.contains("if (!estaPendiente(context)) throw new IllegalStateException"), out);
        assertTrue(out.contains("for (var h : habitaciones(context)) {"), out);
        assertTrue(out.contains("if (ocupada(context, h)) {"), out);
        assertTrue(out.contains("liberar(context, h);"), out);
        // typed two-zone leaf hooks, loop vars threaded as params
        assertTrue(out.contains("private boolean estaPendiente(ReservaOperationContext context) {"), out);
        assertTrue(out.contains("private Iterable<Object> habitaciones(ReservaOperationContext context) {"), out);
        assertTrue(out.contains("private boolean ocupada(ReservaOperationContext context, Object h) {"), out);
        assertTrue(out.contains("private void liberar(ReservaOperationContext context, Object h) {"), out);
        // executable bodies don't carry the scaffold's blanket throw
        assertFalse(out.contains("Pendiente de implementar"), out);
    }

    @Test
    void set_field_with_a_value_expression_inlines_the_mutation() throws Exception {
        var set = new java.util.HashMap<String, Object>();
        set.put("render", "set");
        set.put("stmt", "context.estado(Estado.CONFIRMADA)");
        var model = new java.util.HashMap<String, Object>(baseModel(List.of()));
        model.put("executable", true);
        model.put("executableBody", Map.of("body", List.of(set), "hooks", List.of()));

        var out = render(model);

        assertTrue(out.contains("context.estado(Estado.CONFIRMADA);"), out);
        assertFalse(out.contains("Pendiente de implementar"), out);
    }

    private static java.util.Map<String, Object> node(String render, String name, String call) {
        var m = new java.util.HashMap<String, Object>();
        m.put("render", render);
        m.put("name", name);
        m.put("call", call);
        return m;
    }

    private static Map<String, Object> hook(String name, String returnType, String... params) {
        return Map.of("name", name, "returnType", returnType, "params", List.of(params));
    }
}
