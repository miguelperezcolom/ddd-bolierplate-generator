package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveGatewayUseCase {

    final GatewayRepository repository;

    public void handle(SaveGatewayCommand command) {
        var gateway = repository.findById(new GatewayId(command.id())).orElseThrow();
        gateway.update(new GatewayName(command.name()));
        repository.save(gateway);
    }

}
