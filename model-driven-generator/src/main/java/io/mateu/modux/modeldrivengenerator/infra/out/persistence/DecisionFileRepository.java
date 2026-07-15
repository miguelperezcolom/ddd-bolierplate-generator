package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.DecisionRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.Decision;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DecisionFileRepository implements DecisionRepository {

    final ModelStore repository;

    @Override
    public Optional<Decision> findById(DecisionId id) {
        return repository.findById(id.id(), DecisionEntity.class)
                .map(e -> Decision.load(e.id(), e.name(), e.decision(), e.rationale(),
                        e.status() != null ? e.status().name() : null, e.source()));
    }

    @Override
    public Decision save(Decision entity) {
        repository.save(new DecisionEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getDecision(),
                entity.getRationale(),
                entity.getStatus(),
                entity.getSource(), null));
        return entity;
    }

    @Override
    public void deleteAllById(List<DecisionId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(DecisionId::id).toList(), DecisionEntity.class);
    }
}
