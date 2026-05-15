package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.InvariantRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.InvariantConditionEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.InvariantEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvariantFileRepository implements InvariantRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Invariant> findById(InvariantId id) {
        return repository.findById(id.id(), InvariantEntity.class)
                .map(entity -> Invariant.load(entity.id(), entity.name(), toConditions(entity.conditions())));
    }

    @Override
    public Invariant save(Invariant entity) {
        repository.save(new InvariantEntity(
                entity.getId().id(),
                entity.getName().name(),
                toConditionEntities(entity.getConditions())));
        return entity;
    }

    @Override
    public void deleteAllById(List<InvariantId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(InvariantId::id).toList());
    }

    private List<InvariantCondition> toConditions(List<InvariantConditionEntity> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                .toList();
    }

    private List<InvariantConditionEntity> toConditionEntities(List<InvariantCondition> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new InvariantConditionEntity(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                .toList();
    }
}
