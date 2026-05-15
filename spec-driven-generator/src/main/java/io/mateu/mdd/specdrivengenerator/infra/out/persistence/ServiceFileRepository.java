package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceFileRepository implements ServiceRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service> findById(ServiceId id) {
        return repository.findById(id.id(), ServiceEntity.class)
                .map(entity -> io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service.load(
                        entity.id(),
                        entity.name()));
    }

    @Override
    public io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service save(
            io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service entity) {
        repository.save(new ServiceEntity(
                entity.getId().id(),
                entity.getName().name()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ServiceId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ServiceId::id).toList());
    }
}
