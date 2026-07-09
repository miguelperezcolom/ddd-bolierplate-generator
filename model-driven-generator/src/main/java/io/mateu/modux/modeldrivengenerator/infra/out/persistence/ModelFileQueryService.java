package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ModelQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelFieldDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelFieldValidationDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelValidationDto;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldValidationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelValidationEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelFileQueryService implements ModelQueryService {

    final ModelStore repository;

    @Override
    public ListingData<ModelRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ModelEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ModelRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ModelEntity.class).map(ModelEntity::name).orElseThrow();
    }

    @Override
    public Optional<ModelDto> getById(String id) {
        return repository.findById(id, ModelEntity.class)
                .map(entity -> new ModelDto(entity.id(), entity.name(),
                        entity.fields() == null ? List.of() :
                                entity.fields().stream()
                                        .map(f -> new ModelFieldDto(f.id(), f.name(), f.basicType(), f.type(), f.modelId(),
                                                f.isEnum(), f.enumId(), toFieldValidationDtos(f.validations())))
                                        .toList(),
                        toValidationDtos(entity.validations())));
    }

    private List<ModelFieldValidationDto> toFieldValidationDtos(List<ModelFieldValidationEntity> validations) {
        if (validations == null) return List.of();
        return validations.stream()
                .map(v -> new ModelFieldValidationDto(v.id(), v.type(), v.params()))
                .toList();
    }

    private List<ModelValidationDto> toValidationDtos(List<ModelValidationEntity> validations) {
        if (validations == null) return List.of();
        return validations.stream()
                .map(v -> new ModelValidationDto(v.id(), v.condition(), v.fieldIds(), v.message()))
                .toList();
    }
}
