package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record AggregateDto(String id, String name, String modelId, String persistenceType, String idType, List<OperationDto> operations, List<InvariantDto> invariants) {
}
