package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand.FlowExpander;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand.FlowExpansion;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand.FlowExpansionContext;
import io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand.FlowExpansionContextResolver;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.WhenExpression;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Markdown;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Read-only companion to the Flows CRUD (RFC §11, phase 4): shows, for every flow, the structural
 * building blocks it desugars into ({@link FlowExpander}). The flow stays the single source of
 * truth on disk; this view just makes the "compiled" form visible so authors can see what a one-line
 * intent produces without editing the derived pieces directly.
 */
@Service
@Scope("prototype")
@Title("Flows (expanded)")
@RequiredArgsConstructor
public class FlowExpandedPage implements ComponentTreeSupplier {

    final ModelStore repository;
    final FlowExpander expander;
    final FlowExpansionContextResolver resolver;

    @Override
    public Component component(HttpRequest httpRequest) {
        var flows = repository.findAllOfType(FlowEntity.class);
        var md = new StringBuilder();
        if (flows.isEmpty()) {
            md.append("_No flows declared yet. Add one in **Patrones › Flows**._");
        }
        for (var entity : flows) {
            var flow = toDomain(entity);
            var ctx = resolver.resolve(flow);
            var expansion = expander.expand(flow, ctx);
            appendFlow(md, entity, ctx, expansion);
        }

        return PageView.builder()
                .title("Flows — derived building blocks")
                .subtitle("What each flow intent desugars into. Read-only; edit the flow itself to change these.")
                .content(List.of(new Markdown(md.toString(), null, null)))
                .build();
    }

    private static void appendFlow(StringBuilder md, FlowEntity flow, FlowExpansionContext ctx, FlowExpansion x) {
        md.append("## ").append(flow.name())
                .append("  `").append(flow.archetype() != null ? flow.archetype().name() : "—").append("`\n\n");
        md.append("_when `").append(when(ctx, flow.triggerEvent()))
                .append("` → ").append(ctx.targetModuleName()).append("_\n\n");
        md.append("| Derived piece | Value |\n|---|---|\n");
        if (x.domainEvent() != null) row(md, "Domain event", "`" + x.domainEvent().name() + "`");
        if (x.payloadModel() != null) row(md, "Payload model", "`" + x.payloadModel().name() + "` (" + fields(x) + ")");
        if (x.integrationEvent() != null) row(md, "Integration event", "topic `" + x.integrationEvent().topicName() + "`");
        if (x.readModel() != null) row(md, "Read model", "`" + x.readModel().name() + "` @ " + ctx.targetModuleName());
        if (x.projection() != null) row(md, "Projection", "`" + x.projection().name() + "`");
        if (x.subscription() != null) row(md, "Subscription", "`" + x.subscription().name() + "`");
        if (x.modelMapping() != null) row(md, "Model mapping", "`" + x.modelMapping().name() + "`");
        if (x.saga() != null) row(md, "Saga", "`" + x.saga().name() + "`");
        md.append("\n");
    }

    private static String fields(FlowExpansion x) {
        var fields = x.payloadModel().fields();
        if (fields == null || fields.isEmpty()) return "no fields";
        return fields.stream().map(ModelFieldEntity::name).collect(java.util.stream.Collectors.joining(", "));
    }

    private static void row(StringBuilder md, String piece, String value) {
        md.append("| ").append(piece).append(" | ").append(value).append(" |\n");
    }

    /** Compact one-line trigger form (RFC §5), falling back gracefully when parts are missing. */
    private static String when(FlowExpansionContext ctx, String event) {
        if (event == null || event.isBlank() || ctx.aggregateName() == null) {
            return ctx.aggregateName() + " · " + (event == null ? "—" : event);
        }
        var context = ctx.sourceServiceName() != null ? ctx.sourceServiceName() : "?";
        return WhenExpression.format(context, ctx.aggregateName(), event);
    }

    private static Flow toDomain(FlowEntity e) {
        return Flow.load(e.id(), e.name(), e.description(),
                e.archetype() != null ? e.archetype().name() : null,
                e.triggerAggregateId(), e.triggerEvent(), e.targetModuleId(),
                e.readModelName(), e.materializedFields(), e.targetUseCaseId(), e.inputMappings(), e.overrides());
    }
}
