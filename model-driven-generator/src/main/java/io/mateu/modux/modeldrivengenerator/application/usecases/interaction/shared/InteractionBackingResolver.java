package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionMessageKind;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionParticipantType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.subscription.vo.SubscriptionActionType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionMessageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * Decides whether an interaction message is BACKED: some mechanism already declared in the
 * model actually performs it (a step, a wiring, a button, an emits + a consumer). Strict by
 * kind — when no rule of the message's kind matches the from/to pair, it is not backed.
 * Unbacked messages are intent: they are what the materialization gestures and the
 * interaction lints act upon (docs/design/sequence-scenarios.md).
 */
public final class InteractionBackingResolver {

    private InteractionBackingResolver() {
    }

    public static boolean isBacked(InteractionCatalog catalog, InteractionMessageEntity message) {
        if (message == null || message.kind() == null) return false;
        return isBacked(catalog, message.fromRef(), message.toRef(), message.kind(), message.label());
    }

    public static boolean isBacked(InteractionCatalog catalog, String fromRef, String toRef,
                                   InteractionMessageKind kind, String label) {
        if (fromRef == null || toRef == null || kind == null) return false;
        var from = catalog.typeOf(fromRef);
        var to = catalog.typeOf(toRef);
        return switch (kind) {
            case COMMAND -> isCommandBacked(catalog, fromRef, toRef, from, to);
            case QUERY -> isQueryBacked(catalog, fromRef, toRef, from, to);
            case EVENT -> isEventBacked(catalog, fromRef, toRef, from, label);
            case EXTERNAL -> from == InteractionParticipantType.USE_CASE
                    && to == InteractionParticipantType.EXTERNAL_SYSTEM
                    && stepsOf(catalog, fromRef).stream()
                            .filter(s -> s.type() == UseCaseStepType.CallExternalUseCase)
                            .map(UseCaseStepEntity::externalUseCaseId)
                            .filter(Objects::nonNull)
                            .map(catalog::externalSystemOfUseCase)
                            .filter(Objects::nonNull)
                            .anyMatch(x -> x.id().equals(toRef));
        };
    }

    private static boolean isCommandBacked(InteractionCatalog catalog, String fromRef, String toRef,
                                           InteractionParticipantType from, InteractionParticipantType to) {
        if (from == InteractionParticipantType.ACTOR && to == InteractionParticipantType.USE_CASE) {
            var actor = actor(catalog, fromRef);
            return actor != null && actor.allowedUseCaseIds().contains(toRef);
        }
        if (from == InteractionParticipantType.ACTOR && to == InteractionParticipantType.PAGE) {
            var actor = actor(catalog, fromRef);
            return actor != null && catalog.apps().stream()
                    .filter(app -> actor.uiAdapterIds().contains(app.id()))
                    .anyMatch(app -> menuTargets(app.menuItems(), toRef));
        }
        if (from == InteractionParticipantType.PAGE && to == InteractionParticipantType.USE_CASE) {
            var page = catalog.pages().stream().filter(p -> p.id().equals(fromRef)).findFirst().orElse(null);
            return page != null && pageFiresUseCase(page, toRef);
        }
        if (from == InteractionParticipantType.APP && to == InteractionParticipantType.USE_CASE) {
            return catalog.apps().stream()
                    .filter(app -> app.id().equals(fromRef))
                    .anyMatch(app -> menuItemsFire(app.menuItems(), toRef));
        }
        if (from == InteractionParticipantType.API_OPERATION && to == InteractionParticipantType.USE_CASE) {
            var operation = catalog.apiOperation(fromRef);
            return operation != null && toRef.equals(operation.targetUseCaseId());
        }
        if (from == InteractionParticipantType.USE_CASE && to == InteractionParticipantType.USE_CASE) {
            return stepsOf(catalog, fromRef).stream()
                    .anyMatch(s -> s.type() == UseCaseStepType.CallUseCase && toRef.equals(s.useCaseId()));
        }
        if (from == InteractionParticipantType.USE_CASE && to == InteractionParticipantType.AGGREGATE) {
            return stepsOf(catalog, fromRef).stream()
                    .anyMatch(s -> (s.type() == UseCaseStepType.CallAggregateOperation
                            || s.type() == UseCaseStepType.SaveAggregate)
                            && toRef.equals(s.aggregateId()));
        }
        return false;
    }

    private static boolean isQueryBacked(InteractionCatalog catalog, String fromRef, String toRef,
                                         InteractionParticipantType from, InteractionParticipantType to) {
        if (from == InteractionParticipantType.USE_CASE && to == InteractionParticipantType.QUERY_SERVICE) {
            return stepsOf(catalog, fromRef).stream()
                    .anyMatch(s -> s.type() == UseCaseStepType.CallQueryService && toRef.equals(s.queryServiceId()));
        }
        if (from == InteractionParticipantType.PAGE && to == InteractionParticipantType.QUERY_SERVICE) {
            var page = catalog.pages().stream().filter(p -> p.id().equals(fromRef)).findFirst().orElse(null);
            return page != null && toRef.equals(page.listingQueryServiceId());
        }
        if (from == InteractionParticipantType.ACTOR && to == InteractionParticipantType.QUERY_SERVICE) {
            var actor = actor(catalog, fromRef);
            return actor != null && actor.allowedQueryServiceIds().contains(toRef);
        }
        return false;
    }

    /** EVENT X→Y labelled E: X emits E AND Y consumes E (flow TRIGGERS/MATERIALIZES, a
     * subscription action, or a process/workflow started by it). */
    private static boolean isEventBacked(InteractionCatalog catalog, String fromRef, String toRef,
                                         InteractionParticipantType from, String eventName) {
        if (eventName == null || eventName.isBlank()) return false;
        return emits(catalog, fromRef, from, eventName) && consumes(catalog, toRef, eventName);
    }

    private static boolean emits(InteractionCatalog catalog, String fromRef,
                                 InteractionParticipantType from, String eventName) {
        if (from == InteractionParticipantType.AGGREGATE || from == InteractionParticipantType.DOMAIN_SERVICE) {
            var operations = from == InteractionParticipantType.AGGREGATE
                    ? catalog.aggregate(fromRef) != null ? catalog.aggregate(fromRef).operations() : List.<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity>of()
                    : catalog.domainServices().stream().filter(ds -> ds.id().equals(fromRef)).findFirst()
                            .map(ds -> ds.operations()).orElse(List.of());
            return operations.stream()
                    .map(op -> op.emits())
                    .filter(Objects::nonNull)
                    .flatMap(csv -> Stream.of(csv.split(",")))
                    .anyMatch(name -> InteractionCatalog.sameEventName(name, eventName));
        }
        if (from == InteractionParticipantType.USE_CASE) {
            return stepsOf(catalog, fromRef).stream().anyMatch(s ->
                    (s.type() == UseCaseStepType.PublishDomainEvent && s.domainEventId() != null
                            && InteractionCatalog.sameEventName(catalog.domainEventName(s.domainEventId()), eventName))
                    || (s.type() == UseCaseStepType.PublishApplicationEvent && s.applicationEventId() != null
                            && InteractionCatalog.sameEventName(catalog.applicationEventName(s.applicationEventId()), eventName)));
        }
        return false;
    }

    private static boolean consumes(InteractionCatalog catalog, String toRef, String eventName) {
        var triggeredByFlow = catalog.flows().stream()
                .anyMatch(f -> f.archetype() == FlowArchetype.TRIGGERS
                        && InteractionCatalog.sameEventName(f.triggerEvent(), eventName)
                        && toRef.equals(f.targetUseCaseId()));
        if (triggeredByFlow) return true;
        var subscribed = catalog.subscriptions().stream()
                .filter(s -> InteractionCatalog.sameEventName(s.eventName(), eventName))
                .flatMap(s -> (s.actions() == null ? List.<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionActionEntity>of() : s.actions()).stream())
                .anyMatch(a -> a.type() == SubscriptionActionType.CallUseCase && toRef.equals(a.useCaseId()));
        if (subscribed) return true;
        var startsProcess = catalog.processes().stream()
                .anyMatch(p -> p.id().equals(toRef) && InteractionCatalog.sameEventName(p.triggerEvent(), eventName));
        if (startsProcess) return true;
        var startsWorkflow = catalog.workflows().stream()
                .anyMatch(w -> w.id().equals(toRef) && InteractionCatalog.sameEventName(w.triggerEvent(), eventName));
        if (startsWorkflow) return true;
        var readModel = catalog.readModel(toRef);
        return readModel != null && catalog.flows().stream()
                .anyMatch(f -> f.archetype() == FlowArchetype.MATERIALIZES
                        && InteractionCatalog.sameEventName(f.triggerEvent(), eventName)
                        && InteractionCatalog.sameEventName(f.readModelName(), readModel.name()));
    }

    private static RoleEntity actor(InteractionCatalog catalog, String id) {
        return catalog.actors().stream().filter(a -> a.id().equals(id)).findFirst().orElse(null);
    }

    /** The steps of a use case KNOWN to be in the catalog (the caller only reaches a use-case
     * rule when the participant type resolved to USE_CASE); null-safe on legacy entities. */
    private static List<UseCaseStepEntity> stepsOf(InteractionCatalog catalog, String useCaseId) {
        var useCase = catalog.useCase(useCaseId);
        return useCase == null || useCase.steps() == null ? List.of() : useCase.steps();
    }

    /** The page fires the use case from any of its buttons (toolbars, completion actions)
     * or from a button component anywhere in its content tree. */
    private static boolean pageFiresUseCase(PageEntity page, String useCaseId) {
        var buttons = Stream.of(page.toolbar(), page.bottomBar(), page.completionActions())
                .filter(Objects::nonNull)
                .flatMap(List::stream)
                .map(PageButtonEntity::useCaseId);
        var contentButtons = contentUseCaseIds(page.content());
        return Stream.concat(buttons, contentButtons).anyMatch(useCaseId::equals);
    }

    private static Stream<String> contentUseCaseIds(List<UiComponentNodeEntity> nodes) {
        if (nodes == null) return Stream.empty();
        return nodes.stream().flatMap(node -> Stream.concat(
                Stream.of(node.useCaseId()),
                contentUseCaseIds(node.children())));
    }

    private static boolean menuItemsFire(List<UiMenuItemEntity> items, String useCaseId) {
        if (items == null) return false;
        return items.stream().anyMatch(item -> useCaseId.equals(item.useCaseId())
                || menuItemsFire(item.children(), useCaseId));
    }

    private static boolean menuTargets(List<UiMenuItemEntity> items, String pageId) {
        if (items == null) return false;
        return items.stream().anyMatch(item -> pageId.equals(item.pageId())
                || menuTargets(item.children(), pageId));
    }
}
