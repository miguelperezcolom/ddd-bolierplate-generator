package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record AggregateDto(String id, String name, String modelId, String persistenceType, List<OperationDto> operations, List<InvariantDto> invariants) {
}
