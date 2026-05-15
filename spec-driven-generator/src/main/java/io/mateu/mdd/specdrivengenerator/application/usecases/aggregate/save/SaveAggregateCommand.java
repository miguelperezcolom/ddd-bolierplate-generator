package io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.save;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.OperationDto;

import java.util.List;

public record SaveAggregateCommand(String id, String name,
                                   String modelId,
                                   List<OperationDto> operations,
                                   List<InvariantDto> invariants) {

}
