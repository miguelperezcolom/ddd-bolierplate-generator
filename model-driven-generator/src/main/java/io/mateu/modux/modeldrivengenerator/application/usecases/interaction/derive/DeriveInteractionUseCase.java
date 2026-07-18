package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.derive;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared.InteractionCatalog;
import io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared.InteractionDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionMessageKind;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionMessageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionActionEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Derives an EPHEMERAL interaction from the model, starting at an entry point (a use case,
 * an API operation or an event) and walking the declared mechanisms in a DFS pre-order:
 * the steps of each pipeline IN ORDER, each published event forking one message per
 * consumer (flow TRIGGERS, subscription, process/workflow, flow MATERIALIZES) — use case
 * consumers recurse. Cycles are cut with the DFS path: the message closing the loop is
 * emitted, its expansion is not. The result is read-only ({@code id: null},
 * {@code ephemeral: true}); {@code depth} is the DFS nesting level (activation bars).
 */
@Service
@RequiredArgsConstructor
public class DeriveInteractionUseCase {

    private final ModelStore repository;

    /** kind: USE_CASE | API_OPERATION | EVENT; ref: element id (event NAME for EVENT). */
    public InteractionDto derive(String kind, String ref) {
        if (kind == null || ref == null || ref.isBlank()) {
            throw new IllegalArgumentException("kind y ref son obligatorios");
        }
        var catalog = InteractionCatalog.from(repository);
        var derivation = new Derivation(catalog);
        String name;
        switch (kind) {
            case "USE_CASE" -> {
                if (catalog.useCase(ref) == null) {
                    throw new IllegalArgumentException("Caso de uso desconocido: " + ref);
                }
                derivation.expandUseCase(ref, 0);
                name = catalog.nameOf(ref);
            }
            case "API_OPERATION" -> {
                var operation = catalog.apiOperation(ref);
                if (operation == null) {
                    throw new IllegalArgumentException("Operación de API desconocida: " + ref);
                }
                if (operation.targetUseCaseId() != null) {
                    derivation.emit(ref, operation.targetUseCaseId(), InteractionMessageKind.COMMAND,
                            catalog.nameOf(operation.targetUseCaseId()), 0);
                    derivation.expandUseCase(operation.targetUseCaseId(), 1);
                }
                name = operation.name();
            }
            case "EVENT" -> {
                var emitter = firstEmitter(catalog, ref);
                // No declared emitter: the event name itself stands in as the source
                // lifeline (UNKNOWN participant — the messages show as unbacked intent).
                var from = emitter != null ? emitter : ref;
                derivation.fanOut(from, ref, 0);
                name = ref;
            }
            default -> throw new IllegalArgumentException(
                    "kind debe ser USE_CASE, API_OPERATION o EVENT (recibido: " + kind + ")");
        }
        return new InteractionDto(null, true, name, null, kind, ref,
                InteractionDto.participantsOf(derivation.messages, catalog), derivation.messages);
    }

    /** The first element emitting that event: aggregates, then domain services (operation
     * {@code emits} CSVs), then use cases (Publish steps). Null when nobody declares it. */
    private static String firstEmitter(InteractionCatalog catalog, String eventName) {
        var operationEmitters = java.util.stream.Stream.concat(
                catalog.aggregates().stream().map(a -> Map.entry(a.id(), a.operations())),
                catalog.domainServices().stream().map(ds -> Map.entry(ds.id(), ds.operations())));
        var operationEmitter = operationEmitters
                .filter(e -> e.getValue().stream()
                        .map(op -> op.emits())
                        .filter(Objects::nonNull)
                        .flatMap(csv -> java.util.stream.Stream.of(csv.split(",")))
                        .anyMatch(emitted -> InteractionCatalog.sameEventName(emitted, eventName)))
                .findFirst();
        if (operationEmitter.isPresent()) {
            return operationEmitter.get().getKey();
        }
        return catalog.useCases().stream()
                .filter(uc -> stepsOf(uc).stream().anyMatch(step ->
                        (step.type() == UseCaseStepType.PublishDomainEvent && step.domainEventId() != null
                                && InteractionCatalog.sameEventName(catalog.domainEventName(step.domainEventId()), eventName))
                        || (step.type() == UseCaseStepType.PublishApplicationEvent && step.applicationEventId() != null
                                && InteractionCatalog.sameEventName(catalog.applicationEventName(step.applicationEventId()), eventName))))
                .map(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity::id)
                .findFirst()
                .orElse(null);
    }

    private static List<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity> stepsOf(
            io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity useCase) {
        return useCase.steps() == null ? List.of() : useCase.steps();
    }

    /** One derived chain in progress: the messages so far, the DFS path (cycle cut) and the id counter. */
    private final class Derivation {

        private final InteractionCatalog catalog;
        private final List<InteractionDto.MessageDto> messages = new ArrayList<>();
        private final Deque<String> path = new ArrayDeque<>();
        private int counter;

        Derivation(InteractionCatalog catalog) {
            this.catalog = catalog;
        }

        void emit(String fromRef, String toRef, InteractionMessageKind kind, String label, int depth) {
            counter++;
            var message = new InteractionMessageEntity("m" + counter, fromRef, toRef, kind, label, null);
            messages.add(InteractionDto.toDto(message, depth, catalog));
        }

        /** The steps of the use case, in their declared order; recursion guarded by the DFS path. */
        void expandUseCase(String useCaseId, int depth) {
            if (useCaseId == null || path.contains(useCaseId)) return;
            var useCase = catalog.useCase(useCaseId);
            if (useCase == null) return;
            path.addLast(useCaseId);
            try {
                for (var step : stepsOf(useCase)) {
                    if (step.type() == null) continue;
                    switch (step.type()) {
                        case CallUseCase -> {
                            if (step.useCaseId() == null) continue;
                            emit(useCaseId, step.useCaseId(), InteractionMessageKind.COMMAND,
                                    label(catalog.nameOf(step.useCaseId()), step.name(), step.useCaseId()), depth);
                            expandUseCase(step.useCaseId(), depth + 1);
                        }
                        case CallQueryService -> {
                            if (step.queryServiceId() == null) continue;
                            emit(useCaseId, step.queryServiceId(), InteractionMessageKind.QUERY,
                                    label(catalog.nameOf(step.queryServiceId()), step.name(), step.queryServiceId()), depth);
                        }
                        case CallAggregateOperation, SaveAggregate -> {
                            if (step.aggregateId() == null) continue;
                            emit(useCaseId, step.aggregateId(), InteractionMessageKind.COMMAND,
                                    aggregateStepLabel(step), depth);
                        }
                        case CallExternalUseCase -> {
                            // the lifeline is the external SYSTEM offering the called use case
                            var system = catalog.externalSystemOfUseCase(step.externalUseCaseId());
                            if (system == null) continue;
                            emit(useCaseId, system.id(), InteractionMessageKind.EXTERNAL,
                                    label(externalUseCaseName(system, step.externalUseCaseId()), step.name(), step.externalUseCaseId()), depth);
                        }
                        case PublishDomainEvent -> {
                            if (step.domainEventId() == null) continue;
                            var eventName = catalog.domainEventName(step.domainEventId());
                            if (eventName == null) continue;
                            fanOut(useCaseId, eventName, depth);
                        }
                        case PublishApplicationEvent -> {
                            if (step.applicationEventId() == null) continue;
                            var eventName = catalog.applicationEventName(step.applicationEventId());
                            if (eventName == null) continue;
                            fanOut(useCaseId, eventName, depth);
                        }
                        default -> {
                            // Read/Transform/Custom/Gateway steps: no interaction message
                        }
                    }
                }
            } finally {
                path.removeLast();
            }
        }

        /** One EVENT message per consumer of the event; use case consumers recurse. */
        void fanOut(String fromRef, String eventName, int depth) {
            for (var consumer : consumersOf(eventName)) {
                emit(fromRef, consumer.ref(), InteractionMessageKind.EVENT, eventName, depth);
                if (consumer.useCase()) {
                    expandUseCase(consumer.ref(), depth + 1);
                }
            }
        }

        /** Consumers of an event, in a deterministic order: flow TRIGGERS, subscriptions,
         * processes, workflows, flow MATERIALIZES. One message per distinct consumer ref. */
        private List<Consumer> consumersOf(String eventName) {
            var consumers = new LinkedHashSet<Consumer>();
            catalog.flows().stream()
                    .filter(f -> f.archetype() == FlowArchetype.TRIGGERS
                            && InteractionCatalog.sameEventName(f.triggerEvent(), eventName)
                            && f.targetUseCaseId() != null)
                    .forEach(f -> consumers.add(new Consumer(f.targetUseCaseId(), true)));
            catalog.subscriptions().stream()
                    .filter(s -> InteractionCatalog.sameEventName(s.eventName(), eventName))
                    .flatMap(s -> (s.actions() == null ? List.<SubscriptionActionEntity>of() : s.actions()).stream())
                    .filter(a -> a.type() == SubscriptionActionType.CallUseCase && a.useCaseId() != null)
                    .forEach(a -> consumers.add(new Consumer(a.useCaseId(), true)));
            catalog.processes().stream()
                    .filter(p -> InteractionCatalog.sameEventName(p.triggerEvent(), eventName))
                    .forEach(p -> consumers.add(new Consumer(p.id(), false)));
            catalog.workflows().stream()
                    .filter(w -> InteractionCatalog.sameEventName(w.triggerEvent(), eventName))
                    .forEach(w -> consumers.add(new Consumer(w.id(), false)));
            catalog.flows().stream()
                    .filter(f -> f.archetype() == FlowArchetype.MATERIALIZES
                            && InteractionCatalog.sameEventName(f.triggerEvent(), eventName))
                    .forEach(f -> catalog.readModels().stream()
                            .filter(rm -> InteractionCatalog.sameEventName(f.readModelName(), rm.name()))
                            .findFirst()
                            .ifPresent(rm -> consumers.add(new Consumer(rm.id(), false))));
            return List.copyOf(consumers);
        }

        private String aggregateStepLabel(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity step) {
            if (step.type() == UseCaseStepType.CallAggregateOperation && step.operationId() != null) {
                var aggregate = catalog.aggregate(step.aggregateId());
                var operation = aggregate == null ? null : aggregate.operations().stream()
                        .filter(op -> step.operationId().equals(op.id()))
                        .findFirst().orElse(null);
                if (operation != null) {
                    return operation.name() + "()";
                }
            }
            return catalog.nameOf(step.aggregateId());
        }

        private static String externalUseCaseName(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity system,
                String externalUseCaseId) {
            return system.useCases().stream()
                    .filter(u -> u.id().equals(externalUseCaseId))
                    .map(u -> u.name())
                    .findFirst()
                    .orElse(null);
        }

        private static String label(String preferred, String fallback, String lastResort) {
            return preferred != null && !preferred.isBlank() ? preferred
                    : fallback != null && !fallback.isBlank() ? fallback : lastResort;
        }

        /** A consumer of an event: the target ref and whether it is a use case (recurse). */
        private record Consumer(String ref, boolean useCase) {}
    }
}
