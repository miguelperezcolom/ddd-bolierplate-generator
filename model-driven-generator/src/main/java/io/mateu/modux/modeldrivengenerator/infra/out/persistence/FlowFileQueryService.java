package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.FlowQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowRow;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlowFileQueryService implements FlowQueryService {

    final ModelStore repository;

    @Override
    public ListingData<FlowRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, FlowEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new FlowRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, FlowEntity.class).map(FlowEntity::name).orElse(null);
    }

    @Override
    public Optional<FlowDto> getById(String id) {
        return repository.findById(id, FlowEntity.class)
                .map(entity -> new FlowDto(entity.id(), entity.name(), entity.description(), entity.archetype(),
                        entity.triggerAggregateId(), entity.triggerEvent(), entity.targetBoundedContextId(),
                        entity.readModelName(), entity.materializedFields(),
                        entity.targetUseCaseId(), entity.inputMappings(), entity.overrides()));
    }
}
