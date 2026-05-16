package io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.create;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.OperationDto;

import java.util.List;

public record CreateAggregateCommand(String id, String name,
                                     String modelId,
                                     String persistenceType,
                                     String idType,
                                     String tableName,
                                     String tableSchema,
                                     boolean optimisticLockingEnabled,
                                     boolean eventSourcingEnabled,
                                     Integer snapshotFrequency,
                                     List<OperationDto> operations,
                                     List<InvariantDto> invariants) {

}
