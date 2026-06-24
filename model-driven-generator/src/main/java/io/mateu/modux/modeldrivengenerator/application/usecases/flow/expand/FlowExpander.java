package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionEventHandlerType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEventHandlerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionActionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Desugars a high-level {@link Flow} intent into the structural building blocks it implies,
 * applying convention-based defaults (see docs/design/flows-intent-layer.md). This is a pure
 * model→model transformation; wiring the result into code generation is a later step.
 *
 * <p>Currently implements the {@link FlowArchetype#MATERIALIZES} archetype.
 */
@Service
public class FlowExpander {

    public FlowExpansion expand(Flow flow, FlowExpansionContext ctx) {
        if (flow.getArchetype() == FlowArchetype.MATERIALIZES) {
            return expandMaterializes(flow, ctx);
        }
        throw new UnsupportedOperationException(
                "Flow expansion not implemented yet for archetype " + flow.getArchetype());
    }

    private FlowExpansion expandMaterializes(Flow flow, FlowExpansionContext ctx) {
        var base = flow.getId().id();
        var eventName = flow.getTriggerEvent();
        var topic = ctx.projectName() + "." + kebab(ctx.sourceServiceName()) + "." + kebab(eventName);
        var dlq = topic + ".dlq";

        var eventId = "evt-" + base;
        var modelId = "model-" + base;
        var ieId = "ie-" + base;
        var rmId = "rm-" + base;
        var projId = "proj-" + base;
        var subId = "sub-" + base;

        var payloadModel = new ModelEntity(
                modelId,
                eventName + "Payload",
                (flow.getMaterializedFields() == null ? List.<String>of() : flow.getMaterializedFields()).stream()
                        .map(fieldName -> new ModelFieldEntity(
                                modelId + "-" + fieldName,
                                fieldName,
                                true,
                                ctx.typeOf(fieldName),
                                null,
                                false,
                                null,
                                List.of()))
                        .toList(),
                List.of());

        var domainEvent = new DomainEventEntity(
                eventId, eventName, modelId,
                true, modelId, topic,
                null, null,
                IntegrationEventSerializationFormat.JSON.name(),
                IntegrationEventCompressionType.NONE.name(),
                true, dlq, 5,
                "v1", null, true);

        var integrationEvent = new IntegrationEventEntity(
                ieId, eventName, null, null,
                eventId, modelId, topic,
                null, null,
                IntegrationEventSerializationFormat.JSON,
                IntegrationEventCompressionType.NONE,
                true, dlq, 5,
                "v1", null, true);

        var readModel = new ReadModelEntity(
                rmId, flow.getReadModelName(), flow.getTargetModuleId(), null,
                modelId, ReadModelStorageType.Relational, ReadModelConsistency.Eventual);

        var projection = new ProjectionEntity(
                projId, flow.getReadModelName() + "Projection", rmId,
                List.of(new ProjectionEventHandlerEntity(
                        "peh-" + base, "on" + eventName, eventId, ProjectionEventHandlerType.Upsert, null)),
                "FROM_SCRATCH", "RETRY", 3, false, null);

        var subscription = new SubscriptionEntity(
                subId, ctx.targetModuleName() + eventName,
                eventName, ctx.sourceServiceName(), modelId, topic, kebab(ctx.targetModuleName()),
                3, dlq,
                List.of(new SubscriptionActionEntity(
                        "act-" + base, "updateProjection", SubscriptionActionType.UpdateProjection,
                        null, null, projId, null)),
                null, null, null, null, null, null,
                true, "id");

        return new FlowExpansion(domainEvent, payloadModel, integrationEvent, readModel, projection, subscription);
    }

    /** PascalCase/camelCase → kebab-case (e.g. "ReservaCreada" → "reserva-creada"). */
    static String kebab(String s) {
        if (s == null || s.isBlank()) {
            return s;
        }
        var sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isUpperCase(c)) {
                if (i > 0) {
                    sb.append('-');
                }
                sb.append(Character.toLowerCase(c));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
