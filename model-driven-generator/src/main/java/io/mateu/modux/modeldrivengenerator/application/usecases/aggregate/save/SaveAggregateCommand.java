package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.save;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.OperationDto;

import java.util.List;

public record SaveAggregateCommand(String id, String name,
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
