package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModuleEntity(
        String id,
        String name,
        String gitRepository,
        List<String> aggregateIds,
        List<String> entityIds,
        List<String> valueObjectIds,
        List<String> useCaseIds,
        List<String> domainEventIds,
        List<String> projectionIds,
        List<String> readModelIds,
        List<String> subscriptionIds,
        List<String> sagaIds,
        List<String> scheduledTriggerIds,
        List<BddScenarioEntity> bddScenarios,
        String llmSystemPrompt,
        String tableNamePrefix,
        boolean autoTableNamePrefix,
        String version,
        List<BffEntity> bffs,
        List<AclEntity> acls
) implements Identifiable {
}
