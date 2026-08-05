package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

public record FlowEntity(
        String id,
        String name,
        String description,
        FlowArchetype archetype,
        String triggerAggregateId,
        String triggerEvent,
        String targetBoundedContextId,
        String readModelName,
        List<String> materializedFields,
        String targetUseCaseId,
        List<String> inputMappings,
        List<String> overrides,
        /** Architecture decisions (ADRs) this flow traces back to. */
        List<String> decisionIds,
        /** Alternative trigger: the domain service emitting the trigger event (instead of an aggregate). */
        String triggerDomainServiceId,
        /** Alternative trigger: the use case publishing the trigger APPLICATION event. */
        String triggerUseCaseId
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    /** Backward-compatible constructor (pre-triggerUseCaseId callers and stores). */
    public FlowEntity(String id, String name, String description, FlowArchetype archetype,
                      String triggerAggregateId, String triggerEvent, String targetBoundedContextId,
                      String readModelName, List<String> materializedFields, String targetUseCaseId,
                      List<String> inputMappings, List<String> overrides, List<String> decisionIds,
                      String triggerDomainServiceId) {
        this(id, name, description, archetype, triggerAggregateId, triggerEvent, targetBoundedContextId,
                readModelName, materializedFields, targetUseCaseId, inputMappings, overrides,
                decisionIds, triggerDomainServiceId, null, null);
    }

    /** Backward-compatible constructor (pre-triggerDomainServiceId callers and stores). */
    public FlowEntity(String id, String name, String description, FlowArchetype archetype,
                      String triggerAggregateId, String triggerEvent, String targetBoundedContextId,
                      String readModelName, List<String> materializedFields, String targetUseCaseId,
                      List<String> inputMappings, List<String> overrides, List<String> decisionIds) {
        this(id, name, description, archetype, triggerAggregateId, triggerEvent, targetBoundedContextId,
                readModelName, materializedFields, targetUseCaseId, inputMappings, overrides,
                decisionIds, null, null, null);
    }

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public FlowEntity(String id, String name, String description, FlowArchetype archetype,
                      String triggerAggregateId, String triggerEvent, String targetBoundedContextId,
                      String readModelName, List<String> materializedFields, String targetUseCaseId,
                      List<String> inputMappings, List<String> overrides) {
        this(id, name, description, archetype, triggerAggregateId, triggerEvent, targetBoundedContextId,
                readModelName, materializedFields, targetUseCaseId, inputMappings, overrides,
                List.of(), null, null, null);
    }
}
