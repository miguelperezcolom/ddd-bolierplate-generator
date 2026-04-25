package io.mateu.mdd.specdrivengenerator.application.usecases.aggregate.save;

import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.OperationDto;

import java.util.List;

public record SaveAggregateCommand(String id, String name,
                                   List<FieldDto> fields,
                                   List<OperationDto> operations,
                                   List<InvariantDto> invariants) {

}
