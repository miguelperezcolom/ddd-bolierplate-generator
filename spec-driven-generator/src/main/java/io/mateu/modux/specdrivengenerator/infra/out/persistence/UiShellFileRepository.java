package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.repositories.UiShellRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.UiShell;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellDesignSystem;
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
                        entity.serviceIds(),
                        entity.url(),
                        entity.deploymentType(),
                        entity.cdnProvider(),
                        entity.cdnSiteId(),
                        entity.bucketProvider(),
                        entity.bucketName(),
                        entity.bucketRegion(),
                        entity.deploymentServiceId(),
                        entity.designSystem()));
    }

    @Override
    public UiShell save(UiShell entity) {
        repository.save(new UiShellEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getTitle(),
                entity.getAppVariant(),
                entity.getServiceIds(),
                entity.getUrl(),
                entity.getDeploymentType() != null ? entity.getDeploymentType().name() : null,
                entity.getCdnProvider(),
                entity.getCdnSiteId(),
                entity.getBucketProvider(),
                entity.getBucketName(),
                entity.getBucketRegion(),
                entity.getDeploymentServiceId(),
                entity.getDesignSystem() != null ? entity.getDesignSystem().name() : null));
        return entity;
    }

    @Override
    public void deleteAllById(List<UiShellId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(UiShellId::id).toList(), UiShellEntity.class);
    }
}
