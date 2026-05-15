package io.mateu.mdd.specdrivengenerator.application.usecases.module.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;

import java.util.List;

public record CreateModuleCommand(String id, String name, String gitRepository,
                                  List<String> aggregates, List<String> useCaseIds, List<String> domainEventIds,
                                  List<BddScenarioData> bddScenarios, String llmSystemPrompt,
                                  String tableNamePrefix, boolean autoTableNamePrefix) {

    public CreateModuleCommand {
        if (aggregates == null) aggregates = List.of();
        if (useCaseIds == null) useCaseIds = List.of();
        if (domainEventIds == null) domainEventIds = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
    }

}
