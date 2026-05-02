package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.ValueObjectQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.EnumValueDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectFieldDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectRow;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ValueObjectEntity;
import io.mateu.uidl.data.FieldDataType;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static io.mateu.core.infra.JsonSerializer.listFromJson;

@Service
@RequiredArgsConstructor
public class ValueObjectFileQueryService implements ValueObjectQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ValueObjectRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ValueObjectEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ValueObjectRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ValueObjectEntity.class).map(ValueObjectEntity::name).orElseThrow();
    }

    @Override
    public Optional<ValueObjectDto> getById(String id) {
        return repository.findById(id, ValueObjectEntity.class)
                .map(entity -> new ValueObjectDto(
                        entity.id(),
                        entity.name(),
                        entity.type() != null? ValueObjectType.valueOf(entity.type()):null,
                        listFromJson(entity.valuesJson(), EnumValueDto.class),
                        listFromJson(entity.fieldsJson(), ValueObjectFieldDto.class),
                        entity.dataType() != null? FieldDataType.valueOf(entity.dataType()):null
                        ));
    }
}
