package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ModelMappingQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelMappingDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelMappingExpressionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelMappingRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModelMappingRuleDto;

import java.util.List;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModelMappingFileQueryService implements ModelMappingQueryService {

    final ModelStore repository;

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
        return repository.findById(id, ModelMappingEntity.class).map(ModelMappingEntity::name).orElse(null);
    }

    @Override
    public Optional<ModelMappingDto> getById(String id) {
        return repository.findById(id, ModelMappingEntity.class)
                .map(entity -> new ModelMappingDto(entity.id(), entity.name(),
                        entity.sourceModelId(), entity.targetModelId(),
                        entity.hasCustomPart(), toRuleDtos(entity.rules())));
    }

    private List<ModelMappingRuleDto> toRuleDtos(List<io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingRuleEntity> rules) {
        if (rules == null) return List.of();
        return rules.stream().map(r -> new ModelMappingRuleDto(r.id(), r.sourceFieldId(), r.targetFieldId(),
                r.expressions() == null ? List.of() :
                        r.expressions().stream()
                                .map(e -> new ModelMappingExpressionDto(e.id(), e.inputExpression(), e.outputExpression()))
                                .toList())).toList();
    }
}
