package io.mateu.mdd.specdrivengenerator.application.query.dtos;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;

import java.util.List;
import java.util.Map;

public record OperationDto(
        String id,
        String name,
        List<String> preconditions,
        List<FieldValueSettingDto> sets,
        List<String> emits,
        OperationType type) {

    public OperationDto {
        if (sets == null) sets = List.of();
        if (emits == null) emits = List.of();
        if (preconditions == null) preconditions = List.of();
    }
}
