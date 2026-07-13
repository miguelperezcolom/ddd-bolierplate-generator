package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.QueryServiceRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.QueryService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryOperation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateQueryServiceUseCase {

    final QueryServiceRepository repository;

    public void handle(CreateQueryServiceCommand command) {
        var operations = command.operations() == null ? List.<QueryOperation>of() :
                command.operations().stream()
                        .map(o -> new QueryOperation(o.id(), o.name(), o.description(),
                                o.inputModelId(), o.outputModelId(), o.cardinality()))
                        .toList();
        var queryService = QueryService.of(
                new QueryServiceId(command.id()),
                new QueryServiceName(command.name()),
                command.boundedContextId(),
                command.description(),
                operations);
        repository.save(queryService);
    }

}
