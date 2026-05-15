package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModuleDto(String id, String name, String gitRepository, List<String> aggregateIds, List<BddScenarioDto> bddScenarios, String llmSystemPrompt) {

    public ModuleDto {
        if (aggregateIds == null) aggregateIds = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
    }

}
