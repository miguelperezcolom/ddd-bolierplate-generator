package io.mateu.mdd.specdrivengenerator.application.usecases.module.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;

import java.util.List;

public record SaveModuleCommand(String id, String name, String gitRepository, List<String> aggregates, List<BddScenarioData> bddScenarios) {

    public SaveModuleCommand {
        if (aggregates == null) aggregates = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
    }

}
