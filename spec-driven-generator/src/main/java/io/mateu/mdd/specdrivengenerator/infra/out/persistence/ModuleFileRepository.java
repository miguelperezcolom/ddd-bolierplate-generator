package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModuleRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.Module;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.BddScenario;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.BddScenarioEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ModuleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleFileRepository implements ModuleRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Module> findById(ModuleId id) {
        return repository.findById(id.id(), ModuleEntity.class)
                .map(entity -> Module.load(entity.id(), entity.name(), entity.gitRepository(),
                        entity.aggregateIds(),
                        entity.bddScenarios() == null ? List.of() :
                                entity.bddScenarios().stream()
                                        .map(s -> new BddScenario(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                                        .toList(),
                        entity.llmSystemPrompt()));
    }

    @Override
    public Module save(Module entity) {
        var bddScenarioEntities = entity.getBddScenarios() == null ? List.<BddScenarioEntity>of() :
                entity.getBddScenarios().stream()
                        .map(s -> new BddScenarioEntity(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                        .toList();
        repository.save(new ModuleEntity(entity.getId().id(), entity.getName().name(), entity.getGitRepository(),
                entity.getAggregateIds().stream().map(AggregateId::id).toList(),
                bddScenarioEntities,
                entity.getLlmSystemPrompt()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ModuleId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ModuleId::id).toList());
    }
}
