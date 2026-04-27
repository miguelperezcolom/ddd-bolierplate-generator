package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.query.AggregateQueryService;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.AggregateDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.AggregateRow;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.FieldDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

import static io.mateu.core.infra.JsonSerializer.listFromJson;

@Service
@RequiredArgsConstructor
public class AggregateFileQueryService implements AggregateQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<AggregateRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, AggregateEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new AggregateRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, AggregateEntity.class).map(AggregateEntity::name).orElseThrow();
    }

    @Override
    public Optional<AggregateDto> getById(String id) {
        return repository.findById(id, AggregateEntity.class)
                .map(entity -> new AggregateDto(entity.id(), entity.name(),
                        entity.fields().stream().map(field -> new FieldDto(
                                field.name(),
                                field.label(),
                                field.type(),
                                field.help(),
                                field.valueObjectId(),
                                field.entityId(),
                                field.primitiveType(),
                                field.mandatory(),
                                field.readonly(),
                                field.visible(),
                                field.editable(),
                                field.searchable(),
                                field.filterable()
                        )).toList(),
                        entity.operations().stream()
                                .map(operationEntity -> new OperationDto(
                                        operationEntity.id(),
                                        operationEntity.name(),
                                        Arrays.asList(operationEntity.preconditions().split(",")),
                                        listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                                                Arrays.asList(operationEntity.emits().split(",")),
                                        OperationType.valueOf(operationEntity.type())
                                ))
                                .toList(),
                        entity.invariants().stream()
                                .map(invariant -> new InvariantDto(invariant.id(), invariant.name()))
                                .toList()));
    }
}
