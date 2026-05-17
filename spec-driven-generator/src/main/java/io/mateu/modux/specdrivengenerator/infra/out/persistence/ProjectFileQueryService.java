package io.mateu.modux.specdrivengenerator.infra.out.persistence;

import io.mateu.modux.specdrivengenerator.application.out.query.ProjectQueryService;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ContextMapRelationDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
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

    final CommonFileRepository repository;

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
        return repository.findById(id, ProjectEntity.class).map(ProjectEntity::name).orElseThrow();
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
                        entity.contextMap() == null ? List.<ContextMapRelationDto>of() : entity.contextMap().stream()
                                .map(r -> new ContextMapRelationDto(r.id(), r.name(), r.sourceModuleId(), r.targetModuleId(), r.type(), r.description()))
                                .toList()));
    }
}
