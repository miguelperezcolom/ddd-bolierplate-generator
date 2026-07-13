package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatehla;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelSnapshot;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.PiiClassification;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;

import java.util.List;
import java.util.Objects;

/**
 * Renders the design document (HLA) of a project FROM the model: prose from {@code objective} and
 * descriptions, the ADR table from {@code decisions}, and every diagram derived — structural view
 * (mermaid flowchart), business processes (mermaid sequence diagrams), aggregate lifecycles
 * (mermaid state diagrams), transversal concerns from the declared flags, exposed contracts, and
 * open points from PROPOSED decisions.
 *
 * <p>The document the team receives is a <em>report of the model</em>: it cannot drift from the
 * spec because it is generated from it. Pure and deterministic — unit-testable, diff-stable.
 */
public final class HlaDocumentRenderer {

    private HlaDocumentRenderer() {}

    public static String render(ModelSnapshot m) {
        var project = m.projects().isEmpty() ? null : m.projects().get(0);
        var md = new StringBuilder();

        md.append("# HLA — ").append(project != null ? project.name() : "modelo").append("\n\n");
        md.append("> Documento generado desde el modelo modux — no editar a mano: es un informe de la especificación.\n\n");

        contextAndObjective(md, project);
        decisions(md, m);
        structuralView(md, m, project);
        responsibilities(md, m, project);
        processes(md, m);
        lifecycles(md, m);
        transversals(md, m, project);
        contracts(md, m);
        openPoints(md, m);

        return md.toString();
    }

    // --- §1 -------------------------------------------------------------------

    private static void contextAndObjective(StringBuilder md, ProjectEntity project) {
        md.append("## 1. Contexto y objetivo\n\n");
        if (project != null && project.objective() != null && !project.objective().isBlank()) {
            md.append(project.objective().trim()).append("\n\n");
        } else {
            md.append("_(sin objetivo declarado — rellena `project.objective` en el modelo)_\n\n");
        }
    }

    // --- §2 -------------------------------------------------------------------

    private static void decisions(StringBuilder md, ModelSnapshot m) {
        md.append("## 2. Decisiones (ADR)\n\n");
        if (m.decisions().isEmpty()) {
            md.append("_Sin decisiones registradas._\n\n");
            return;
        }
        md.append("| # | Decisión | Motivo | Estado |\n|---|---|---|---|\n");
        var ordered = m.decisions().stream()
                .sorted(java.util.Comparator.comparingInt((io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity d) ->
                        d.id() != null ? d.id().length() : 0)
                        .thenComparing(d -> nvl(d.id())))
                .toList();
        for (var d : ordered) {
            md.append("| ").append(d.id())
                    .append(" | **").append(nvl(d.name())).append("** — ").append(nvl(d.decision()))
                    .append(" | ").append(nvl(d.rationale()))
                    .append(" | ").append(d.status() != null ? d.status().name() : "—")
                    .append(" |\n");
        }
        md.append("\n");
    }

    // --- §3 -------------------------------------------------------------------

    private static void structuralView(StringBuilder md, ModelSnapshot m, ProjectEntity project) {
        md.append("## 3. Vista estructural\n\n```mermaid\nflowchart LR\n");
        for (var service : m.services()) {
            md.append("  subgraph ").append(id(service.id())).append("[\"servicio ").append(service.name()).append("\"]\n");
            for (var boundedContextId : nvlList(service.boundedContextIds())) {
                var boundedContext = boundedContextById(m, boundedContextId);
                if (boundedContext == null) continue;
                var label = boundedContext.name() + (boundedContext.subdomainType() != null ? " · " + boundedContext.subdomainType().name() : "");
                md.append("    ").append(id(boundedContextId)).append("[\"").append(label).append("\"]\n");
            }
            md.append("  end\n");
        }
        if (project != null) {
            for (var external : project.externalSystems()) {
                md.append("  ").append(id(external.id())).append("[[\"").append(external.name()).append("\"]]\n");
            }
            for (var rel : project.contextMap()) {
                md.append("  ").append(id(rel.sourceBoundedContextId())).append(" -->|").append(nvl(rel.type()))
                        .append("| ").append(id(rel.targetBoundedContextId())).append("\n");
            }
        }
        for (var flow : m.flows()) {
            var source = boundedContextOfAggregate(m, flow.triggerAggregateId());
            if (source == null || flow.targetBoundedContextId() == null) continue;
            md.append("  ").append(id(source.id())).append(" -.->|").append(nvl(flow.triggerEvent()))
                    .append("| ").append(id(flow.targetBoundedContextId())).append("\n");
        }
        md.append("```\n\n");
    }

    // --- §4 -------------------------------------------------------------------

    private static void responsibilities(StringBuilder md, ModelSnapshot m, ProjectEntity project) {
        md.append("## 4. Responsabilidades por contenedor\n\n");
        md.append("| Contenedor | Subdominio | Responsabilidad |\n|---|---|---|\n");
        for (var boundedContext : m.boundedContexts()) {
            var notes = new StringBuilder(nvl(boundedContext.description()));
            nvlList(boundedContext.bffs()).forEach(b -> notes.append(notes.isEmpty() ? "" : " ")
                    .append("**BFF** ").append(b.name()).append(" (").append(nvl(b.basePath())).append(")."));
            nvlList(boundedContext.acls()).forEach(a -> notes.append(notes.isEmpty() ? "" : " ")
                    .append("**ACL** hacia ").append(a.externalSystem()).append("."));
            // "la lectura vive en otro sitio" — the delegated read side is an architectural fact
            if (boundedContext.readSideBoundedContextId() != null || boundedContext.readSideExternalSystemId() != null) {
                var target = boundedContext.readSideBoundedContextId() != null
                        ? boundedContextById(m, boundedContext.readSideBoundedContextId()) != null
                                ? boundedContextById(m, boundedContext.readSideBoundedContextId()).name() : boundedContext.readSideBoundedContextId()
                        : boundedContext.readSideExternalSystemId();
                notes.append(notes.isEmpty() ? "" : " ").append("**Lectura delegada** en ").append(target)
                        .append(boundedContext.readSideVia() != null ? " vía " + boundedContext.readSideVia() : "").append(".");
            }
            md.append("| ").append(boundedContext.name())
                    .append(" | ").append(boundedContext.subdomainType() != null ? boundedContext.subdomainType().name() : "—")
                    .append(" | ").append(notes.isEmpty() ? "—" : notes.toString()).append(" |\n");
        }
        if (project != null) {
            for (var external : project.externalSystems()) {
                md.append("| ").append(external.name()).append(" _(externo)_ | — | ")
                        .append(nvl(external.description())).append(" |\n");
            }
        }
        md.append("\n");
    }

    // --- §5 -------------------------------------------------------------------

    private static void processes(StringBuilder md, ModelSnapshot m) {
        if (m.processes().isEmpty()) return;
        md.append("## 5. Procesos de negocio\n\n");
        for (var process : m.processes()) {
            md.append("### ").append(process.name()).append("\n\n");
            if (process.description() != null) md.append(process.description()).append("\n\n");
            if (process.sla() != null) md.append("_SLA extremo a extremo: ").append(process.sla()).append("_\n\n");
            md.append("```mermaid\nsequenceDiagram\n  autonumber\n");
            var owner = boundedContextById(m, process.ownerBoundedContextId());
            var ownerName = owner != null ? owner.name() : nvl(process.ownerBoundedContextId());
            md.append("  participant SAGA as ").append(process.name()).append(" (saga · ").append(ownerName).append(")\n");
            md.append("  Note over SAGA: arranca con ").append(nvl(process.triggerEvent())).append("\n");
            for (var step : process.steps()) {
                if (step.type() == ProcessStepType.HUMAN) {
                    var role = nvl(step.roleId());
                    md.append("  SAGA->>").append(id(role)).append(": tarea '").append(step.name()).append("'");
                    if (step.deadline() != null) md.append(" (plazo ").append(step.deadline()).append(")");
                    md.append("\n");
                    if (step.escalationRoleId() != null) {
                        md.append("  Note over ").append(id(role)).append(": vencida → escala a ")
                                .append(step.escalationRoleId()).append("\n");
                    }
                } else {
                    var useCase = useCaseById(m, step.useCaseId());
                    var target = useCase != null ? useCase.name() : nvl(step.useCaseId());
                    md.append("  SAGA->>EXEC: ").append(target).append("\n");
                    if (step.compensationUseCaseId() != null && !step.compensationUseCaseId().isBlank()) {
                        var comp = useCaseById(m, step.compensationUseCaseId());
                        md.append("  Note over EXEC: compensación: ")
                                .append(comp != null ? comp.name() : step.compensationUseCaseId()).append("\n");
                    }
                }
            }
            var completion = process.onCompletionEventName() != null && !process.onCompletionEventName().isBlank()
                    ? process.onCompletionEventName() : process.name() + "Completed";
            md.append("  Note over SAGA: publica ").append(completion).append("\n```\n\n");
        }
    }

    // --- §6 -------------------------------------------------------------------

    private static void lifecycles(StringBuilder md, ModelSnapshot m) {
        var withLifecycle = m.aggregates().stream().filter(a -> a.lifecycle() != null).toList();
        if (withLifecycle.isEmpty()) return;
        md.append("## 6. Ciclos de vida\n\n");
        for (var aggregate : withLifecycle) {
            var lc = aggregate.lifecycle();
            md.append("### ").append(aggregate.name()).append("\n\n```mermaid\nstateDiagram-v2\n");
            if (lc.initialState() != null) {
                md.append("  [*] --> ").append(lc.initialState()).append("\n");
            }
            for (var t : lc.transitions()) {
                var operation = aggregate.operations().stream()
                        .filter(o -> Objects.equals(o.id(), t.operationId()))
                        .map(o -> o.name()).findFirst().orElse(null);
                md.append("  ").append(t.fromState()).append(" --> ").append(t.toState());
                if (operation != null) md.append(": ").append(operation);
                md.append("\n");
            }
            // terminal states (no outgoing transitions) flow to [*]
            for (var state : lc.states()) {
                boolean hasOutgoing = lc.transitions().stream().anyMatch(t -> state.equals(t.fromState()));
                if (!hasOutgoing) md.append("  ").append(state).append(" --> [*]\n");
            }
            md.append("```\n\n");
        }
    }

    // --- §7 -------------------------------------------------------------------

    private static void transversals(StringBuilder md, ModelSnapshot m, ProjectEntity project) {
        md.append("## 7. Aspectos transversales\n\n");

        var idempotent = m.useCases().stream().filter(UseCaseEntity::idempotencyEnabled).toList();
        if (!idempotent.isEmpty()) {
            md.append("- **Idempotencia**: ").append(idempotent.stream()
                    .map(uc -> uc.name() + " (clave `" + nvl(uc.idempotencyKeyField()) + "`)")
                    .reduce((a, b) -> a + ", " + b).orElse("")).append(".\n");
        }
        var events = m.domainEvents();
        if (!events.isEmpty()) {
            long published = events.stream().filter(e -> e.publishAsIntegrationEvent()).count();
            long dlq = events.stream().filter(e -> e.deadLetterQueueEnabled()).count();
            md.append("- **Eventos**: ").append(events.size()).append(" eventos de dominio, ")
                    .append(published).append(" publicados como integración (outbox), ")
                    .append(dlq).append(" con DLQ.\n");
        }
        var piiFields = m.models().stream()
                .flatMap(model -> model.fields() == null ? java.util.stream.Stream.<String>empty() : model.fields().stream()
                        .filter(f -> f.piiClassification() != null && f.piiClassification() != PiiClassification.NONE)
                        .map(f -> model.name() + "." + f.name() + " (" + f.piiClassification()
                                + (f.anonymizationStrategy() != null ? " → " + f.anonymizationStrategy() : "") + ")"))
                .toList();
        if (!piiFields.isEmpty()) {
            md.append("- **PII**: ").append(String.join(", ", piiFields)).append(".\n");
        }
        if (project != null && project.tenancyStrategy() != null) {
            md.append("- **Tenancy**: ").append(project.tenancyStrategy().name()).append(".\n");
        }
        for (var boundedContext : m.boundedContexts()) {
            for (var policy : boundedContext.accessPolicies()) {
                md.append("- **Acceso por datos** (").append(boundedContext.name()).append("): ")
                        .append(policy.name()).append(" — `").append(nvl(policy.expression())).append("`.\n");
            }
            for (var kpi : boundedContext.kpis()) {
                md.append("- **KPI** (").append(boundedContext.name()).append("): ").append(kpi.name())
                        .append(" — ").append(kpi.measure() != null ? kpi.measure().name() : "—")
                        .append(kpi.valueField() != null ? " de " + kpi.valueField() : "")
                        .append(" por ").append(String.join("+", kpi.dimensionFields()))
                        .append(kpi.timeGrain() != null ? " · " + kpi.timeGrain().name() : "").append(".\n");
            }
        }
        var audited = m.aggregates().stream().filter(AggregateEntity::audited).map(AggregateEntity::name).toList();
        if (!audited.isEmpty()) {
            md.append("- **Auditoría**: ").append(String.join(", ", audited)).append(".\n");
        }
        md.append("\n");
    }

    // --- §8 -------------------------------------------------------------------

    private static void contracts(StringBuilder md, ModelSnapshot m) {
        md.append("## 8. Contratos expuestos\n\n");
        for (var boundedContext : m.boundedContexts()) {
            for (var bff : nvlList(boundedContext.bffs())) {
                md.append("### ").append(bff.name()).append(" (").append(nvl(bff.basePath())).append(")\n\n");
                if (bff.description() != null) md.append(bff.description()).append("\n\n");
            }
        }
        var exposed = m.useCases().stream()
                .filter(uc -> uc.exposedAsRest() || uc.exposedAsGrpc() || uc.exposedAsMcp())
                .toList();
        if (!exposed.isEmpty()) {
            md.append("| Use case | REST | gRPC | MCP |\n|---|---|---|---|\n");
            for (var uc : exposed) {
                md.append("| ").append(uc.name())
                        .append(" | ").append(uc.exposedAsRest()
                                ? nvl(uc.restHttpMethod()) + " " + nvl(uc.restPath()) : "—")
                        .append(" | ").append(uc.exposedAsGrpc()
                                ? nvl(uc.grpcServiceName()) + "." + nvl(uc.grpcMethodName()) : "—")
                        .append(" | ").append(uc.exposedAsMcp() ? "✓" : "—")
                        .append(" |\n");
            }
            md.append("\n");
        }
    }

    // --- §9 -------------------------------------------------------------------

    private static void openPoints(StringBuilder md, ModelSnapshot m) {
        md.append("## 9. Puntos abiertos\n\n");
        var open = m.decisions().stream().filter(d -> d.status() == DecisionStatus.PROPOSED).toList();
        if (open.isEmpty()) {
            md.append("_Ninguno — todas las decisiones registradas están resueltas._\n");
            return;
        }
        for (var d : open) {
            md.append("1. **").append(nvl(d.name())).append("** — ").append(nvl(d.decision())).append("\n");
        }
    }

    // --- helpers ----------------------------------------------------------------

    private static BoundedContextEntity boundedContextById(ModelSnapshot m, String id) {
        return m.boundedContexts().stream().filter(mod -> mod.id().equals(id)).findFirst().orElse(null);
    }

    private static BoundedContextEntity boundedContextOfAggregate(ModelSnapshot m, String aggregateId) {
        if (aggregateId == null) return null;
        return m.boundedContexts().stream()
                .filter(mod -> mod.aggregateIds() != null && mod.aggregateIds().contains(aggregateId))
                .findFirst().orElse(null);
    }

    private static UseCaseEntity useCaseById(ModelSnapshot m, String id) {
        if (id == null) return null;
        return m.useCases().stream().filter(uc -> uc.id().equals(id)).findFirst().orElse(null);
    }

    /** Mermaid-safe node id. */
    private static String id(String raw) {
        return raw == null ? "unknown" : raw.replaceAll("[^A-Za-z0-9_]", "_");
    }

    private static String nvl(String s) {
        return s == null ? "" : s;
    }

    private static <T> List<T> nvlList(List<T> list) {
        return list != null ? list : List.of();
    }
}
