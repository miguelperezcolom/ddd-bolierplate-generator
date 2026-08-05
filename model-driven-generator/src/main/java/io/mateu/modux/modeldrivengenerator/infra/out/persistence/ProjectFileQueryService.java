package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ContextMapRelationDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.uidl.data.ListingData;
import java.util.List;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectFileQueryService implements ProjectQueryService {

    final ModelStore repository;

    @Override
    public ListingData<ProjectRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ProjectEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ProjectRow(entity.id(), entity.name(), entity.outputPath(), entity.packageName()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ProjectEntity.class).map(ProjectEntity::name).orElse(null);
    }

    @Override
    public Optional<ProjectDto> getById(String id) {
        return repository.findById(id, ProjectEntity.class)
                .map(entity -> new ProjectDto(
                        entity.id(),
                        entity.name(),
                        entity.outputPath(),
                        entity.packageName(),
                        entity.gitRepository(),
                        entity.database(),
                        entity.dbMigrationTool(),
                        entity.terraformProvider(), entity.terraformProviderVersion(),
                        entity.terraformBackendType(),
                        entity.iamProvider(),
                        entity.messageBrokerType(),
                        entity.tracingProvider(),
                        entity.metricsProvider(),
                        entity.loggingProvider(),
                        entity.llmProvider(),
                        entity.cacheProvider(),
                        entity.fileStorageProvider(),
                        entity.emailProvider(),
                        entity.secretsProvider(),
                        entity.cicdProvider(),
                        entity.environments(),
                        entity.serviceIds(),
                        repository.findAllOfType(ContextMapRelationEntity.class).stream()
                                .map(r -> new ContextMapRelationDto(r.id(), r.name(), r.sourceBoundedContextId(), r.targetBoundedContextId(), r.type(), r.description()))
                                .toList()));
    }
}
