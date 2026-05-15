package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateGatewayUseCase {

    final GatewayRepository repository;

    public void handle(CreateGatewayCommand command) {
        var gateway = Gateway.of(
                new GatewayId(command.id()),
                new GatewayName(command.name()));
        repository.save(gateway);
    }

}
