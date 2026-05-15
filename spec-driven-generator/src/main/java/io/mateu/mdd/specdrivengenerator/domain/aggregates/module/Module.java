package io.mateu.mdd.specdrivengenerator.domain.aggregates.module;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.BddScenario;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleName;
import lombok.Getter;

import java.util.List;

@Getter
public class Module {

    private ModuleId id;
    private ModuleName name;
    private String gitRepository;
    private List<AggregateId> aggregateIds;
    private List<BddScenario> bddScenarios;
    private String llmSystemPrompt;

    public static Module of(ModuleId id, ModuleName name, String gitRepository, List<AggregateId> aggregateIds, List<BddScenario> bddScenarios, String llmSystemPrompt) {
        var module = new Module();
        module.id = id;
        module.name = name;
        module.gitRepository = gitRepository;
        module.aggregateIds = aggregateIds;
        module.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        module.llmSystemPrompt = llmSystemPrompt;
        return module;
    }

    public static Module load(String id, String name, String gitRepository, List<String> aggregateIds, List<BddScenario> bddScenarios, String llmSystemPrompt) {
        var module = new Module();
        module.id = new ModuleId(id);
        module.name = new ModuleName(name);
        module.gitRepository = gitRepository;
        module.aggregateIds = aggregateIds.stream().map(AggregateId::new).toList();
        module.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        module.llmSystemPrompt = llmSystemPrompt;
        return module;
    }

    public void update(ModuleName name, String gitRepository, List<AggregateId> aggregateIds, List<BddScenario> bddScenarios, String llmSystemPrompt) {
        this.name = name;
        this.gitRepository = gitRepository;
        this.aggregateIds = aggregateIds;
        this.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        this.llmSystemPrompt = llmSystemPrompt;
    }
}
