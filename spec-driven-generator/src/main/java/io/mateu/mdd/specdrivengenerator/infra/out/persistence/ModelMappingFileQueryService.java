package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.ModelMappingQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelMappingDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelMappingRow;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelMappingFileQueryService implements ModelMappingQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ModelMappingRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ModelMappingEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ModelMappingRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ModelMappingEntity.class).map(ModelMappingEntity::name).orElseThrow();
    }

    @Override
    public Optional<ModelMappingDto> getById(String id) {
        return repository.findById(id, ModelMappingEntity.class)
                .map(entity -> new ModelMappingDto(entity.id(), entity.name(),
                        entity.sourceModelId(), entity.targetModelId()));
    }
}
