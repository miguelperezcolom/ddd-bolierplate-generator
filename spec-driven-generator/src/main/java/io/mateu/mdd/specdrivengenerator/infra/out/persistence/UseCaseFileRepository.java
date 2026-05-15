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
                .map(entity -> UseCase.load(
                        entity.id(),
                        entity.name(),
                        entity.exposedAsRest(),
                        entity.exposedAsGrpc(),
                        entity.exposedAsMcp(),
                        entity.exposedAsAsync(),
                        entity.exposedAsUi()));
    }

    @Override
    public UseCase save(UseCase entity) {
        repository.save(new UseCaseEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getExposedAsRest().value(),
                entity.getExposedAsGrpc().value(),
                entity.getExposedAsMcp().value(),
                entity.getExposedAsAsync().value(),
                entity.getExposedAsUi().value()));
        return entity;
    }

    @Override
    public void deleteAllById(List<UseCaseId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UseCaseId::id).toList());
    }
}
