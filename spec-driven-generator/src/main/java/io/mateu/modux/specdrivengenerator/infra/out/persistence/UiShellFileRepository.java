package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiShellRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.UiShell;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.UiShellEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UiShellFileRepository implements UiShellRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<UiShell> findById(UiShellId id) {
        return repository.findById(id.id(), UiShellEntity.class)
                .map(entity -> UiShell.load(
                        entity.id(),
                        entity.name(),
                        entity.title(),
                        entity.appVariant(),
                        entity.serviceIds()));
    }

    @Override
    public UiShell save(UiShell entity) {
        repository.save(new UiShellEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getTitle(),
                entity.getAppVariant(),
                entity.getServiceIds()));
        return entity;
    }

    @Override
    public void deleteAllById(List<UiShellId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UiShellId::id).toList());
    }
}
