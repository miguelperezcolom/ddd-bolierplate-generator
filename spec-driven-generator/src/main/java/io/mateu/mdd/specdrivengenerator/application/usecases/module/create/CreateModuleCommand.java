package io.mateu.mdd.specdrivengenerator.application.usecases.module.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;

import java.util.List;

public record CreateModuleCommand(String id, String name, String gitRepository, List<String> aggregates, List<BddScenarioData> bddScenarios) {

    public CreateModuleCommand {
        if (aggregates == null) aggregates = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
    }

}
