package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.QueryServiceRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryOperation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveQueryServiceUseCase {

    final QueryServiceRepository repository;

    public void handle(SaveQueryServiceCommand command) {
        var queryService = repository.findById(new QueryServiceId(command.id())).orElseThrow();
        var operations = command.operations() == null ? List.<QueryOperation>of() :
                command.operations().stream()
                        .map(o -> new QueryOperation(o.id(), o.name(), o.description(),
                                o.inputModelId(), o.outputModelId(), o.cardinality()))
                        .toList();
        queryService.update(
                new QueryServiceName(command.name()),
                command.moduleId(),
                command.description(),
                operations);
        repository.save(queryService);
    }

}
