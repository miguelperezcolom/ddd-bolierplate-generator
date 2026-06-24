package io.mateu.modux.modeldrivengenerator.domain.aggregates.flow;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowName;
import lombok.Getter;

import java.util.List;

/**
 * A flow declares a cross-context interaction by intent (e.g. "recording a booking
 * materializes locator+holder in FrontOffice"). It is the single source of truth that
 * desugars into the structural building blocks (IntegrationEvent, ReadModel, Projection,
 * Subscription...). See docs/design/flows-intent-layer.md.
 */
@Getter
public class Flow {

    private FlowId id;
    private FlowName name;
    private String description;
    private FlowArchetype archetype;

    // when: <triggerAggregate> <triggerEvent>  (the source context is the aggregate's module)
    private String triggerAggregateId;
    private String triggerEvent;

    // target bounded context (the `in:` of the archetype)
    private String targetModuleId;

    // materializes: read model name (`as`) + the subset of fields that cross the boundary
    private String readModelName;
    private List<String> materializedFields;

    // triggers: the target use case to call
    private String targetUseCaseId;

    // escape hatch: per-piece overrides as "scope.property=value" lines
    private List<String> overrides;

    public static Flow of(FlowId id, FlowName name, String description, FlowArchetype archetype,
                          String triggerAggregateId, String triggerEvent, String targetModuleId,
                          String readModelName, List<String> materializedFields,
                          String targetUseCaseId, List<String> overrides) {
        var flow = new Flow();
        flow.id = id;
        flow.name = name;
        flow.description = description;
        flow.archetype = archetype;
        flow.triggerAggregateId = triggerAggregateId;
        flow.triggerEvent = triggerEvent;
        flow.targetModuleId = targetModuleId;
        flow.readModelName = readModelName;
        flow.materializedFields = materializedFields != null ? materializedFields : List.of();
        flow.targetUseCaseId = targetUseCaseId;
        flow.overrides = overrides != null ? overrides : List.of();
        return flow;
    }

    public static Flow load(String id, String name, String description, String archetype,
                            String triggerAggregateId, String triggerEvent, String targetModuleId,
                            String readModelName, List<String> materializedFields,
                            String targetUseCaseId, List<String> overrides) {
        var flow = new Flow();
        flow.id = new FlowId(id);
        flow.name = new FlowName(name);
        flow.description = description;
        flow.archetype = archetype != null ? FlowArchetype.valueOf(archetype) : null;
        flow.triggerAggregateId = triggerAggregateId;
        flow.triggerEvent = triggerEvent;
        flow.targetModuleId = targetModuleId;
        flow.readModelName = readModelName;
        flow.materializedFields = materializedFields != null ? materializedFields : List.of();
        flow.targetUseCaseId = targetUseCaseId;
        flow.overrides = overrides != null ? overrides : List.of();
        return flow;
    }

    public void update(FlowName name, String description, FlowArchetype archetype,
                       String triggerAggregateId, String triggerEvent, String targetModuleId,
                       String readModelName, List<String> materializedFields,
                       String targetUseCaseId, List<String> overrides) {
        this.name = name;
        this.description = description;
        this.archetype = archetype;
        this.triggerAggregateId = triggerAggregateId;
        this.triggerEvent = triggerEvent;
        this.targetModuleId = targetModuleId;
        this.readModelName = readModelName;
        this.materializedFields = materializedFields != null ? materializedFields : List.of();
        this.targetUseCaseId = targetUseCaseId;
        this.overrides = overrides != null ? overrides : List.of();
    }
}
