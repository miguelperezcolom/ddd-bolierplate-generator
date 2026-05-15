package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModuleDto(String id, String name, String gitRepository,
                        List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                        List<String> useCaseIds, List<String> domainEventIds,
                        List<BddScenarioDto> bddScenarios, String llmSystemPrompt,
                        String tableNamePrefix, boolean autoTableNamePrefix) {

    public ModuleDto {
        if (aggregateIds == null) aggregateIds = List.of();
        if (entityIds == null) entityIds = List.of();
        if (valueObjectIds == null) valueObjectIds = List.of();
        if (useCaseIds == null) useCaseIds = List.of();
        if (domainEventIds == null) domainEventIds = List.of();
        if (bddScenarios == null) bddScenarios = List.of();
    }

}
