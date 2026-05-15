package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.UseCaseRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.UseCaseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UseCaseFileRepository implements UseCaseRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<UseCase> findById(UseCaseId id) {
        return repository.findById(id.id(), UseCaseEntity.class)
                .map(entity -> UseCase.load(entity.id(), entity.name()));
    }

    @Override
    public UseCase save(UseCase entity) {
        repository.save(new UseCaseEntity(
                entity.getId().id(),
                entity.getName().name()));
        return entity;
    }

    @Override
    public void deleteAllById(List<UseCaseId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UseCaseId::id).toList());
    }
}
