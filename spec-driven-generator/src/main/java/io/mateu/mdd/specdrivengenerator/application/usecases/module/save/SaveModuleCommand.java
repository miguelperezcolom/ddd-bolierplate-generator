package io.mateu.mdd.specdrivengenerator.application.usecases.module.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.module.AclData;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.BffData;

import java.util.List;

public record SaveModuleCommand(String id, String name, String gitRepository,
                                List<String> aggregates, List<String> entityIds, List<String> valueObjectIds,
                                List<String> useCaseIds, List<String> domainEventIds,
                                List<String> projectionIds, List<String> readModelIds,
                                List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                                List<BddScenarioData> bddScenarios, String llmSystemPrompt,
                                String tableNamePrefix, boolean autoTableNamePrefix, String version,
                                List<BffData> bffs, List<AclData> acls) {

    public SaveModuleCommand {
        if (aggregates == null) aggregates = List.of();
        if (entityIds == null) entityIds = List.of();
        if (valueObjectIds == null) valueObjectIds = List.of();
        if (useCaseIds == null) useCaseIds = List.of();
        if (domainEventIds == null) domainEventIds = List.of();
        if (projectionIds == null) projectionIds = List.of();
        if (readModelIds == null) readModelIds = List.of();
        if (subscriptionIds == null) subscriptionIds = List.of();
        if (sagaIds == null) sagaIds = List.of();
        if (scheduledTriggerIds == null) scheduledTriggerIds = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
        if (bffs == null) bffs = List.of();
        if (acls == null) acls = List.of();
    }

}
