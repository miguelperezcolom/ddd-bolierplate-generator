package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.operation.vo.OperationType;

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
        Integer defaultPageSize,
        /** CUSTOM operations: natural-language spec of what the operation does (feeds the scaffold and ai-complete). */
        String intent) {

    /** Backward-compatible constructor (pre-intent callers). */
    public OperationDto(String id, String name, String inputModelId, String outputModelId,
                        List<String> preconditions, List<FieldValueSettingDto> sets, List<String> emits,
                        OperationType type, boolean paginated, Integer defaultPageSize) {
        this(id, name, inputModelId, outputModelId, preconditions, sets, emits, type,
                paginated, defaultPageSize, null);
    }

    public OperationDto {
        if (sets == null) sets = List.of();
        if (emits == null) emits = List.of();
        if (preconditions == null) preconditions = List.of();
    }
}
