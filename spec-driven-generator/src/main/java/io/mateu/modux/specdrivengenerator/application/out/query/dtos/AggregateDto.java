package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record AggregateDto(String id, String name, String modelId, String persistenceType, String idType, String tableName, String tableSchema, boolean optimisticLockingEnabled, boolean eventSourcingEnabled, Integer snapshotFrequency, List<OperationDto> operations, List<InvariantDto> invariants) {
}
