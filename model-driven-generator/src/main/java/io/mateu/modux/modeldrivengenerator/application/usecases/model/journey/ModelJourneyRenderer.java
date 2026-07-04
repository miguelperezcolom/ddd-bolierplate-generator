package io.mateu.modux.modeldrivengenerator.application.usecases.model.journey;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelSnapshot;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;

import java.util.Comparator;
import java.util.Objects;

/**
 * The model-centric lens: for every {@link ModelEntity model}, where it plays which role — the
 * design axiom being that a system is models flowing between stations (UI/API/event in → use case
 * → aggregate → event out → consumer), being enriched and mapped along the way. This view makes
 * that journey visible: persistence roles, command/query roles, UI roles, event roles, and the
 * mapping edges that connect one model to the next.
 */
public final class ModelJourneyRenderer {

    private ModelJourneyRenderer() {}

    public static String render(ModelSnapshot m) {
        var md = new StringBuilder();
        var models = m.models().stream()
                .sorted(Comparator.comparing(model -> model.name() != null ? model.name() : model.id()))
                .toList();
        if (models.isEmpty()) {
            md.append("_No models declared yet._");
            return md.toString();
        }
        for (var model : models) {
            journey(md, m, model);
        }
        return md.toString();
    }

    private static void journey(StringBuilder md, ModelSnapshot m, ModelEntity model) {
        md.append("## ").append(model.name()).append("\n\n");
        var rows = new StringBuilder();

        // --- persistence roles ---
        m.aggregates().stream().filter(a -> Objects.equals(a.modelId(), model.id()))
                .forEach(a -> row(rows, "Persistencia", "estado del agregado **" + a.name() + "**"
                        + (a.eventSourcingEnabled() ? " (event-sourced)" : "")));
        m.readModels().stream().filter(rm -> Objects.equals(rm.modelId(), model.id()))
                .forEach(rm -> row(rows, "Persistencia", "read model **" + rm.name() + "**"));

        // --- command/API roles ---
        for (var uc : m.useCases()) {
            var exposure = exposure(uc);
            if (Objects.equals(uc.inputModelId(), model.id())) {
                row(rows, "Entrada", "comando de **" + uc.name() + "**" + exposure);
            }
            if (Objects.equals(uc.outputModelId(), model.id())) {
                row(rows, "Salida", "respuesta de **" + uc.name() + "**" + exposure);
            }
        }
        for (var qs : m.queryServices()) {
            if (qs.operations() == null) continue;
            for (var op : qs.operations()) {
                if (Objects.equals(op.inputModelId(), model.id())) {
                    row(rows, "Entrada", "filtros de **" + qs.name() + "." + op.name() + "**");
                }
                if (Objects.equals(op.outputModelId(), model.id())) {
                    row(rows, "Salida", "resultado de **" + qs.name() + "." + op.name() + "**");
                }
            }
        }

        // --- UI roles ---
        m.pages().stream().filter(p -> Objects.equals(p.modelId(), model.id()))
                .forEach(p -> row(rows, "UI", "pantalla **" + p.name() + "**"
                        + (p.route() != null ? " (`" + p.route() + "`)" : "")));

        // --- event roles ---
        for (var ev : m.domainEvents()) {
            if (Objects.equals(ev.modelId(), model.id())) {
                row(rows, "Evento", "payload de **" + ev.name() + "**");
            }
            if (Objects.equals(ev.integrationModelId(), model.id())
                    && !Objects.equals(ev.modelId(), model.id())) {
                row(rows, "Evento", "payload de integración de **" + ev.name() + "**");
            }
        }
        m.subscriptions().stream().filter(s -> Objects.equals(s.inputModelId(), model.id()))
                .forEach(s -> row(rows, "Evento", "consumido por la subscription **" + s.name() + "**"));

        // --- entity roles (inside an aggregate) ---
        m.entities().stream().filter(e -> Objects.equals(e.modelId(), model.id()))
                .forEach(e -> row(rows, "Persistencia", "entidad **" + e.name() + "**"
                        + (e.parentAggregateId() != null
                                ? " dentro del agregado **" + aggregateName(m, e.parentAggregateId()) + "**"
                                + (e.isCollection() ? " (colección)" : "") : "")));

        if (rows.isEmpty()) {
            md.append("⚠ _Modelo sin uso — ninguna estación lo referencia._\n\n");
        } else {
            md.append("| Rol | Dónde |\n|---|---|\n").append(rows).append("\n");
        }

        // --- mapping edges: the flow to/from other models ---
        var edges = new StringBuilder();
        for (var mapping : m.modelMappings()) {
            if (Objects.equals(mapping.sourceModelId(), model.id())) {
                edges.append("- → se transforma en **").append(modelName(m, mapping.targetModelId()))
                        .append("** vía `").append(mapping.name()).append("`\n");
            }
            if (Objects.equals(mapping.targetModelId(), model.id())) {
                edges.append("- ← se alimenta de **").append(modelName(m, mapping.sourceModelId()))
                        .append("** vía `").append(mapping.name()).append("`\n");
            }
        }
        if (!edges.isEmpty()) {
            md.append("**Mapeos:**\n\n").append(edges).append("\n");
        }
    }

    private static String aggregateName(ModelSnapshot m, String aggregateId) {
        return m.aggregates().stream().filter(a -> a.id().equals(aggregateId))
                .map(a -> a.name()).findFirst().orElse(aggregateId);
    }

    private static void row(StringBuilder rows, String role, String where) {
        rows.append("| ").append(role).append(" | ").append(where).append(" |\n");
    }

    private static String exposure(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity uc) {
        var marks = new StringBuilder();
        if (uc.exposedAsRest()) marks.append(" REST");
        if (uc.exposedAsGrpc()) marks.append(" gRPC");
        if (uc.exposedAsMcp()) marks.append(" MCP");
        if (uc.exposedAsAsync()) marks.append(" async");
        if (uc.exposedAsUi()) marks.append(" UI");
        return marks.isEmpty() ? "" : " _(" + marks.toString().trim() + ")_";
    }

    private static String modelName(ModelSnapshot m, String modelId) {
        return m.models().stream().filter(mo -> mo.id().equals(modelId))
                .map(ModelEntity::name).findFirst().orElse(modelId);
    }
}
