package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateGatewayUseCase {

    final GatewayRepository repository;

    public void handle(CreateGatewayCommand command) {
        var operations = command.operations() == null ? List.of() :
                command.operations().stream()
                        .map(o -> new GatewayOperation(o.id(), o.name(), o.inputModelId(), o.outputModelId()))
                        .toList();
        var gateway = Gateway.of(
                new GatewayId(command.id()),
                new GatewayName(command.name()),
                operations);
        repository.save(gateway);
    }

}
