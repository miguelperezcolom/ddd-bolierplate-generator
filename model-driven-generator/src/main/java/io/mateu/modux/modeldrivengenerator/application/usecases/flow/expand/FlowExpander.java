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
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEventHandlerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
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
        return switch (flow.getArchetype()) {
            case MATERIALIZES -> expandMaterializes(flow, ctx);
            case TRIGGERS -> expandTriggers(flow, ctx);
            case NOTIFIES -> expandNotifies(flow, ctx);
            case ORCHESTRATES -> expandOrchestrates(flow, ctx);
        };
    }

    private FlowExpansion expandMaterializes(Flow flow, FlowExpansionContext ctx) {
        var base = flow.getId().id();
        var eventName = flow.getTriggerEvent();
        var topic = topicOf(flow, ctx);
        var dlq = topic + ".dlq";
        var modelId = "model-" + base;
        var eventId = "evt-" + base;

        var payloadModel = payloadModel(flow, ctx, modelId, eventName);
        var domainEvent = domainEvent(eventId, eventName, modelId, topic, dlq);
        var integrationEvent = integrationEvent("ie-" + base, eventName, modelId, eventId, topic, dlq, ctx.sourceModuleId());

        var rmId = "rm-" + base;
        var projId = "proj-" + base;
        var readModel = new ReadModelEntity(
                rmId, flow.getReadModelName(), flow.getTargetModuleId(), null,
                modelId, ReadModelStorageType.Relational, ReadModelConsistency.Eventual);

        var projection = new ProjectionEntity(
                projId, flow.getReadModelName() + "Projection", rmId,
                List.of(new ProjectionEventHandlerEntity(
                        "peh-" + base, "on" + eventName, eventId, ProjectionEventHandlerType.Upsert, null)),
                "FROM_SCRATCH", "RETRY", 3, false, null);

        var subscription = new SubscriptionEntity(
                "sub-" + base, ctx.targetModuleName() + eventName,
                eventName, ctx.sourceServiceName(), modelId, topic, kebab(ctx.targetModuleName()),
                3, dlq,
                List.of(new SubscriptionActionEntity(
                        "act-" + base, "updateProjection", SubscriptionActionType.UpdateProjection,
                        null, null, projId, null)),
                null, null, null, null, null, null,
                true, "id");

        return new FlowExpansion(domainEvent, payloadModel, integrationEvent, readModel, projection, subscription, null, null);
    }

    private FlowExpansion expandTriggers(Flow flow, FlowExpansionContext ctx) {
        var base = flow.getId().id();
        var eventName = flow.getTriggerEvent();
        var topic = topicOf(flow, ctx);
        var dlq = topic + ".dlq";
        var modelId = "model-" + base;
        var eventId = "evt-" + base;

        var payloadModel = payloadModel(flow, ctx, modelId, eventName);
        var domainEvent = domainEvent(eventId, eventName, modelId, topic, dlq);
        var integrationEvent = integrationEvent("ie-" + base, eventName, modelId, eventId, topic, dlq, ctx.sourceModuleId());

        var useCaseName = ctx.targetUseCaseName() != null ? ctx.targetUseCaseName() : flow.getTargetUseCaseId();
        var mappingId = "mm-" + base;
        // identity mapping (payload field → use case input field by same name); renames are an override
        var modelMapping = new ModelMappingEntity(
                mappingId, eventName + "To" + capitalize(useCaseName),
                modelId, ctx.targetUseCaseInputModelId(), true, List.of());

        var subscription = new SubscriptionEntity(
                "sub-" + base, ctx.targetModuleName() + eventName,
                eventName, ctx.sourceServiceName(), modelId, topic, kebab(ctx.targetModuleName()),
                3, dlq,
                List.of(new SubscriptionActionEntity(
                        "act-" + base, lowerFirst(useCaseName), SubscriptionActionType.CallUseCase,
                        flow.getTargetUseCaseId(), null, null, mappingId)),
                null, null, null, null, null, null,
                true, "id");

        return new FlowExpansion(domainEvent, payloadModel, integrationEvent, null, null, subscription, modelMapping, null);
    }

    private FlowExpansion expandNotifies(Flow flow, FlowExpansionContext ctx) {
        var base = flow.getId().id();
        var eventName = flow.getTriggerEvent();
        var topic = topicOf(flow, ctx);
        var dlq = topic + ".dlq";
        var modelId = "model-" + base;
        var eventId = "evt-" + base;

        // an outbound notification: the event leaves the context as an integration event that an
        // external system consumes. No internal target (read model / use case / saga).
        var payloadModel = payloadModel(flow, ctx, modelId, eventName);
        var domainEvent = domainEvent(eventId, eventName, modelId, topic, dlq);
        var integrationEvent = integrationEvent("ie-" + base, eventName, modelId, eventId, topic, dlq, ctx.sourceModuleId());

        return new FlowExpansion(domainEvent, payloadModel, integrationEvent, null, null, null, null, null);
    }

    private FlowExpansion expandOrchestrates(Flow flow, FlowExpansionContext ctx) {
        var base = flow.getId().id();
        var eventName = flow.getTriggerEvent();
        var topic = topicOf(flow, ctx);
        var dlq = topic + ".dlq";
        var modelId = "model-" + base;
        var eventId = "evt-" + base;
        var sagaId = "saga-" + base;

        var payloadModel = payloadModel(flow, ctx, modelId, eventName);
        var domainEvent = domainEvent(eventId, eventName, modelId, topic, dlq);
        var integrationEvent = integrationEvent("ie-" + base, eventName, modelId, eventId, topic, dlq, ctx.sourceModuleId());

        // skeleton saga triggered by the event with one placeholder step; the author fills in the
        // real steps and compensations (it is generated as an EventConductor workflow definition)
        var firstStep = new SagaStepEntity(
                "step-" + base, "process", SagaStepType.Custom,
                null, null, null, null, null, null, null, null);
        var saga = new SagaEntity(
                sagaId, flow.getName().name() + "Saga",
                null, null, List.of(eventId), List.of(firstStep),
                3, null, dlq, true);

        var subscription = new SubscriptionEntity(
                "sub-" + base, ctx.targetModuleName() + eventName,
                eventName, ctx.sourceServiceName(), modelId, topic, kebab(ctx.targetModuleName()),
                3, dlq,
                List.of(new SubscriptionActionEntity(
                        "act-" + base, "start" + flow.getName().name(), SubscriptionActionType.StartSaga,
                        null, sagaId, null, null)),
                null, null, null, null, null, null,
                true, "id");

        return new FlowExpansion(domainEvent, payloadModel, integrationEvent, null, null, subscription, null, saga);
    }

    // --- shared building blocks ---

    private String topicOf(Flow flow, FlowExpansionContext ctx) {
        return kebab(ctx.projectName()) + "." + kebab(ctx.sourceServiceName()) + "." + kebab(flow.getTriggerEvent());
    }

    private ModelEntity payloadModel(Flow flow, FlowExpansionContext ctx, String modelId, String eventName) {
        return new ModelEntity(
                modelId,
                eventName + "Payload",
                (flow.getMaterializedFields() == null ? List.<String>of() : flow.getMaterializedFields()).stream()
                        .map(fieldName -> new ModelFieldEntity(
                                modelId + "-" + fieldName, fieldName, true, ctx.typeOf(fieldName),
                                null, false, null, List.of()))
                        .toList(),
                List.of());
    }

    private DomainEventEntity domainEvent(String eventId, String eventName, String modelId, String topic, String dlq) {
        return new DomainEventEntity(
                eventId, eventName, modelId,
                true, modelId, topic, null, null,
                IntegrationEventSerializationFormat.JSON.name(),
                IntegrationEventCompressionType.NONE.name(),
                true, dlq, 5, "v1", null, true);
    }

    private IntegrationEventEntity integrationEvent(String ieId, String eventName, String modelId, String eventId,
                                                    String topic, String dlq, String moduleId) {
        return new IntegrationEventEntity(
                ieId, eventName, moduleId, null,
                eventId, modelId, topic, null, null,
                IntegrationEventSerializationFormat.JSON,
                IntegrationEventCompressionType.NONE,
                true, dlq, 5, "v1", null, true);
    }

    private static String capitalize(String s) {
        return s == null || s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private static String lowerFirst(String s) {
        return s == null || s.isEmpty() ? s : Character.toLowerCase(s.charAt(0)) + s.substring(1);
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
