package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ProjectionQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectionEventHandlerDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectionRow;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectionFileQueryService implements ProjectionQueryService {

    final ModelStore repository;

    @Override
    public ListingData<ProjectionRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ProjectionEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ProjectionRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ProjectionEntity.class).map(ProjectionEntity::name).orElseThrow();
    }

    @Override
    public Optional<ProjectionDto> getById(String id) {
        return repository.findById(id, ProjectionEntity.class)
                .map(entity -> new ProjectionDto(
                        entity.id(),
                        entity.name(),
                        entity.readModelId(),
                        entity.handlers() == null ? List.of() : entity.handlers().stream()
                                .map(h -> new ProjectionEventHandlerDto(h.id(), h.name(), h.domainEventId(), h.type(), h.modelMappingId()))
                                .toList(),
                        entity.rebuildStrategy(),
                        entity.errorHandlingStrategy(),
                        entity.maxRetries(),
                        entity.snapshotEnabled(), entity.snapshotFrequency()));
    }
}
