package io.mateu.modux.modeldrivengenerator.application.usecases.model.topology;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * The ONE place that answers deployment-topology questions. The chain is
 * project → services → modules, and each module distributes elements of one
 * bounded context. A bounded context has no service of its own: it reaches the
 * runtime through its modules, so "which service is this element in" is always
 * element → module (the one that claims it, else the context's main module) →
 * the service that deploys that module.
 */
public final class ModuleTopology {

    private ModuleTopology() {
    }

    /** The module id a bounded context's main module gets when nobody chose one. */
    public static String mainModuleId(String boundedContextId) {
        return boundedContextId + "-main";
    }

    /** The main module a bounded context is born with (not yet persisted). */
    public static ModuleEntity mainModuleFor(BoundedContextEntity boundedContext) {
        return ModuleEntity.builder()
                .id(mainModuleId(boundedContext.id()))
                .name(boundedContext.name())
                .boundedContextId(boundedContext.id())
                .main(true)
                .build();
    }

    public static List<ModuleEntity> modulesOf(List<ModuleEntity> modules, String boundedContextId) {
        if (boundedContextId == null) return List.of();
        return modules.stream()
                .filter(m -> boundedContextId.equals(m.boundedContextId()))
                .toList();
    }

    /** The main module: the flagged one, else the context's first (legacy stores). */
    public static ModuleEntity mainModuleOf(List<ModuleEntity> modules, String boundedContextId) {
        var own = modulesOf(modules, boundedContextId);
        return own.stream().filter(ModuleEntity::main).findFirst()
                .orElse(own.isEmpty() ? null : own.get(0));
    }

    /** The module an element lives in: the one that claims it, else the main module. */
    public static ModuleEntity moduleOfElement(List<ModuleEntity> modules, String boundedContextId, String elementId) {
        var own = modulesOf(modules, boundedContextId);
        return own.stream()
                .filter(m -> m.elementIds() != null && m.elementIds().contains(elementId))
                .findFirst()
                .orElseGet(() -> mainModuleOf(modules, boundedContextId));
    }

    public static ServiceEntity serviceOfModule(List<ServiceEntity> services, String moduleId) {
        if (moduleId == null) return null;
        return services.stream()
                .filter(s -> s.moduleIds() != null && s.moduleIds().contains(moduleId))
                .findFirst().orElse(null);
    }

    /** Where an element runs. Null when the topology does not reach it. */
    public static ServiceEntity serviceOfElement(List<ServiceEntity> services, List<ModuleEntity> modules,
                                                 String boundedContextId, String elementId) {
        var module = moduleOfElement(modules, boundedContextId, elementId);
        return module == null ? null : serviceOfModule(services, module.id());
    }

    /** Where a bounded context's main module runs — its home service for display purposes. */
    public static ServiceEntity serviceOfBoundedContext(List<ServiceEntity> services, List<ModuleEntity> modules,
                                                        String boundedContextId) {
        var main = mainModuleOf(modules, boundedContextId);
        return main == null ? null : serviceOfModule(services, main.id());
    }

    /**
     * What a module actually packages: its explicit elements, plus — when it is
     * the main module — everything of its context nobody else claimed.
     */
    public static Set<String> effectiveElementIds(List<ModuleEntity> modules, BoundedContextEntity boundedContext,
                                                  ModuleEntity module) {
        var effective = new HashSet<String>(module.elementIds() == null ? List.of() : module.elementIds());
        if (!isMain(modules, boundedContext.id(), module)) return effective;
        var claimedElsewhere = new HashSet<String>();
        modulesOf(modules, boundedContext.id()).stream()
                .filter(m -> !m.id().equals(module.id()))
                .forEach(m -> claimedElsewhere.addAll(m.elementIds()));
        allElementIds(boundedContext).stream()
                .filter(id -> !claimedElsewhere.contains(id))
                .forEach(effective::add);
        return effective;
    }

    private static boolean isMain(List<ModuleEntity> modules, String boundedContextId, ModuleEntity module) {
        var main = mainModuleOf(modules, boundedContextId);
        return main != null && main.id().equals(module.id());
    }

    /** Every element id a bounded context owns, across all its element kinds. */
    public static List<String> allElementIds(BoundedContextEntity boundedContext) {
        var ids = new ArrayList<String>();
        addAll(ids, boundedContext.aggregateIds());
        addAll(ids, boundedContext.entityIds());
        addAll(ids, boundedContext.valueObjectIds());
        addAll(ids, boundedContext.useCaseIds());
        addAll(ids, boundedContext.domainEventIds());
        addAll(ids, boundedContext.projectionIds());
        addAll(ids, boundedContext.readModelIds());
        addAll(ids, boundedContext.subscriptionIds());
        addAll(ids, boundedContext.sagaIds());
        addAll(ids, boundedContext.scheduledTriggerIds());
        addAll(ids, boundedContext.decisionIds());
        addAll(ids, boundedContext.applicationEventIds());
        addAll(ids, boundedContext.domainServiceIds());
        addAll(ids, boundedContext.uiAdapterIds());
        return ids;
    }

    private static void addAll(List<String> target, List<String> source) {
        if (source != null) target.addAll(source);
    }
}
