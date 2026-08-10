package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

import static org.junit.jupiter.api.Assertions.assertTrue;

import freemarker.template.Configuration;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

/**
 * Phase 4 of {@code docs/design/operation-body.md}: a domain service now generates — a stateless
 * coordinator interface plus a developer-owned default impl whose operation bodies carry the
 * modeled steps as a guided scaffold (which always compiles).
 */
class DomainServiceScaffoldTest {

    private String render(String template, Map<String, Object> model) throws Exception {
        var cfg = new Configuration(Configuration.VERSION_2_3_32);
        cfg.setClassForTemplateLoading(getClass(), "/templates");
        cfg.setDefaultEncoding("UTF-8");
        var out = new StringWriter();
        cfg.getTemplate(template).process(model, out);
        return out.toString();
    }

    private Map<String, Object> model() {
        var op = Map.of("name", "reasignarHabitaciones", "intent", "Reasigna habitaciones libres",
                "steps", List.of(
                        Map.of("type", "ReadAggregate", "name", "cargarPlano"),
                        Map.of("type", "PublishDomainEvent", "name", "reasignadas")));
        return Map.of(
                "project", Map.of("packageName", "com.acme"),
                "module", Map.of("name", "FrontOffice"),
                "domainService", Map.of("name", "Planificador"),
                "operations", List.of(op));
    }

    @Test
    void interface_declares_a_method_per_operation() throws Exception {
        var out = render("domain-service.ftl", model());

        assertTrue(out.contains("package com.acme.frontoffice.domain.services;"), out);
        assertTrue(out.contains("public interface Planificador {"), out);
        assertTrue(out.contains("void reasignarHabitaciones();"), out);
    }

    @Test
    void default_impl_scaffolds_each_operation_body_from_the_model() throws Exception {
        var out = render("domain-service-operation-default.ftl", model());

        assertTrue(out.contains("class DefaultPlanificador implements Planificador"), out);
        assertTrue(out.contains("public void reasignarHabitaciones() {"), out);
        assertTrue(out.contains("call operation cargarPlano") || out.contains("cargarPlano"), out);
        assertTrue(out.contains("emit reasignadas"), out);
        // always compiles: guided body + throw
        assertTrue(out.contains("throw new UnsupportedOperationException"), out);
    }
}
