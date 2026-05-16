package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationType;

import java.util.List;

public record OperationDto(
        String id,
        String name,
        String inputModelId,
        String outputModelId,
        List<String> preconditions,
        List<FieldValueSettingDto> sets,
        List<String> emits,
        OperationType type,
        boolean paginated,
        Integer defaultPageSize) {

    public OperationDto {
        if (sets == null) sets = List.of();
        if (emits == null) emits = List.of();
        if (preconditions == null) preconditions = List.of();
    }
}
