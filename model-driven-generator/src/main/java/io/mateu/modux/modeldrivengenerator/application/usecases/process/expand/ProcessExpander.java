package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventCompressionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventSerializationFormat;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelConsistency;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaStepType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionActionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.uidl.data.FieldDataType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Desugars a business {@link ProcessEntity} into the technical pieces it implies, by convention
 * (see docs/design/process-intent-layer.md):
 *
 * <ul>
 *   <li>a Subscription on the trigger event that starts the saga,</li>
 *   <li>a Saga — AUTOMATED steps become CallUseCase steps (with compensation steps when declared),
 *       HUMAN steps become waiting (Custom) steps completed by task events,</li>
 *   <li>a task worklist (payload Model + ReadModel in the owner context) when there are HUMAN steps,</li>
 *   <li>a ScheduledTrigger per deadline-bounded step that watches for overdue tasks and escalates,</li>
 *   <li>a completion DomainEvent published when the last step finishes.</li>
 * </ul>
 *
 * Pure model→model transformation, mirroring {@code FlowExpander}.
 */
@Service
public class ProcessExpander {

    public ProcessExpansion expand(ProcessEntity process, ProcessExpansionContext ctx) {
        var base = process.id();
        var eventName = process.triggerEvent();
        var topic = kebab(ctx.projectName()) + "." + kebab(ctx.sourceServiceName()) + "." + kebab(eventName);
        var dlq = topic + ".dlq";
        var sagaId = "saga-" + base;

        var saga = saga(process, sagaId, dlq, ctx.triggerEventId());
        var subscription = new SubscriptionEntity(
                "sub-" + base, ctx.ownerModuleName() + eventName,
                eventName, ctx.sourceServiceName(), null, topic, kebab(ctx.ownerModuleName()),
                3, dlq,
                List.of(new SubscriptionActionEntity(
                        "act-" + base, "start" + process.name(), SubscriptionActionType.StartSaga,
                        null, sagaId, null, null)),
                null, null, null, null, null, null,
                true, "id");

        var humanSteps = process.steps().stream().filter(s -> s.type() == ProcessStepType.HUMAN).toList();
        ModelEntity taskModel = null;
        ReadModelEntity taskReadModel = null;
        if (!humanSteps.isEmpty()) {
            var modelId = "model-" + base + "-task";
            taskModel = new ModelEntity(modelId, process.name() + "Task", List.of(
                    field(modelId, "taskId", FieldDataType.string),
                    field(modelId, "processId", FieldDataType.string),
                    field(modelId, "stepId", FieldDataType.string),
                    field(modelId, "stepName", FieldDataType.string),
                    field(modelId, "assigneeRole", FieldDataType.string),
                    field(modelId, "status", FieldDataType.status),
                    field(modelId, "dueAt", FieldDataType.dateTime),
                    field(modelId, "createdAt", FieldDataType.dateTime)),
                    List.of());
            taskReadModel = new ReadModelEntity(
                    "rm-" + base + "-tasks", process.name() + "Tasks", process.ownerModuleId(),
                    "Worklist of pending human tasks of the " + process.name() + " process.",
                    modelId, ReadModelStorageType.Relational, ReadModelConsistency.Eventual);
        }

        var deadlineTriggers = new ArrayList<ScheduledTriggerEntity>();
        for (var step : process.steps()) {
            if (step.deadline() == null || step.deadline().isBlank()) continue;
            deadlineTriggers.add(new ScheduledTriggerEntity(
                    "st-" + base + "-" + step.id(),
                    process.name() + " · " + step.name() + " deadline watch",
                    "0 */15 * * * *", null,
                    null, null,
                    "Escalates '" + step.name() + "' tasks overdue past " + step.deadline()
                            + (step.escalationRoleId() != null ? " to role " + step.escalationRoleId() : "") + ".",
                    null, null, null, null, null,
                    false, true, 3));
        }

        var completionName = process.onCompletionEventName() != null && !process.onCompletionEventName().isBlank()
                ? process.onCompletionEventName() : process.name() + "Completed";
        var completionTopic = kebab(ctx.projectName()) + "." + kebab(ctx.ownerModuleName()) + "." + kebab(completionName);
        var completionEvent = new DomainEventEntity(
                "evt-" + base + "-completed", completionName, null,
                true, null, completionTopic, null, null,
                IntegrationEventSerializationFormat.JSON.name(),
                IntegrationEventCompressionType.NONE.name(),
                true, completionTopic + ".dlq", 5, "v1", null, true);

        return new ProcessExpansion(subscription, saga, taskModel, taskReadModel, deadlineTriggers, completionEvent);
    }

    private SagaEntity saga(ProcessEntity process, String sagaId, String dlq, String triggerEventId) {
        var steps = new ArrayList<SagaStepEntity>();
        var compensations = new ArrayList<SagaStepEntity>();
        for (var step : process.steps()) {
            if (step.type() == ProcessStepType.HUMAN) {
                steps.add(new SagaStepEntity(
                        "step-" + step.id(), "await:" + step.name(), SagaStepType.Custom,
                        null, null, null, null, null, null, null, null));
            } else {
                String compensatingStepId = null;
                if (step.compensationUseCaseId() != null && !step.compensationUseCaseId().isBlank()) {
                    compensatingStepId = "comp-" + step.id();
                    compensations.add(new SagaStepEntity(
                            compensatingStepId, "undo:" + step.name(), SagaStepType.CallUseCase,
                            null, null, null, null, null, null, step.compensationUseCaseId(), null));
                }
                steps.add(new SagaStepEntity(
                        "step-" + step.id(), step.name(), SagaStepType.CallUseCase,
                        compensatingStepId, null, null, null, null, null, step.useCaseId(), null));
            }
        }
        steps.addAll(compensations);
        return new SagaEntity(
                sagaId, process.name() + "Saga",
                slaMillis(process.sla()), null,
                triggerEventId != null ? List.of(triggerEventId) : List.of(),
                steps, 3, null, dlq, true);
    }

    /** Rough ISO-8601 duration → millis for the saga timeout; null when no SLA is declared. */
    static Long slaMillis(String sla) {
        if (sla == null || sla.isBlank()) return null;
        try {
            if (sla.startsWith("P") && sla.contains("T")) {
                return java.time.Duration.parse(sla).toMillis();
            }
            if (sla.startsWith("PT")) {
                return java.time.Duration.parse(sla).toMillis();
            }
            // date-based durations (P3D, P2W…) — go through Period for the day part
            var period = java.time.Period.parse(sla);
            return period.getDays() * 86_400_000L
                    + period.getMonths() * 30L * 86_400_000L
                    + period.getYears() * 365L * 86_400_000L;
        } catch (Exception e) {
            return null;
        }
    }

    private static ModelFieldEntity field(String modelId, String name, FieldDataType type) {
        return new ModelFieldEntity(modelId + "-" + name, name, true, type, null, false, null, List.of());
    }

    /** PascalCase/camelCase → kebab-case. */
    static String kebab(String s) {
        if (s == null || s.isBlank()) return s;
        var sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isUpperCase(c)) {
                if (i > 0) sb.append('-');
                sb.append(Character.toLowerCase(c));
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
