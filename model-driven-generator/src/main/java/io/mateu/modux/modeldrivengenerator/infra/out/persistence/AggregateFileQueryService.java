package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.AggregateQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.AggregateDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.AggregateRow;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantConditionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.OperationDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
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

    final ModelStore repository;

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
        return repository.findById(id, AggregateEntity.class).map(AggregateEntity::name).orElse(null);
    }

    @Override
    public Optional<AggregateDto> getById(String id) {
        return repository.findById(id, AggregateEntity.class)
                .map(entity -> new AggregateDto(entity.id(), entity.name(),
                        entity.modelId(),
                        entity.persistenceType() != null ? entity.persistenceType().name() : null,
                        entity.idType() != null ? entity.idType().name() : null,
                        entity.tableName(),
                        entity.tableSchema(),
                        entity.optimisticLockingEnabled(),
                        entity.eventSourcingEnabled(),
                        entity.snapshotFrequency(),
                        entity.operations().stream()
                                .map(operationEntity -> new OperationDto(
                                        operationEntity.id(),
                                        operationEntity.name(),
                                        operationEntity.inputModelId(),
                                        operationEntity.outputModelId(),
                                        splitCsv(operationEntity.preconditions()),
                                        listFromJson(operationEntity.sets(), FieldValueSettingDto.class),
                                        splitCsv(operationEntity.emits()),
                                        OperationType.valueOf(operationEntity.type()),
                                        operationEntity.paginated(),
                                        operationEntity.defaultPageSize()
                                ))
                                .toList(),
                        entity.invariants().stream()
                                .map(invariant -> new InvariantDto(
                                        invariant.id(),
                                        invariant.name(),
                                        invariant.conditions() != null ? invariant.conditions().stream()
                                                .map(c -> new InvariantConditionDto(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                                .toList() : java.util.List.of()))
                                .toList(),
                        entity.valueObjectIds()));
    }

    /** Splits a comma-separated field, tolerating null/blank (returns an empty list). */
    private static java.util.List<String> splitCsv(String value) {
        if (value == null || value.isBlank()) return java.util.List.of();
        return Arrays.asList(value.split(","));
    }
}
