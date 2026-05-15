package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.GatewayRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteGatewayUseCase {

    final GatewayRepository repository;

    public void handle(DeleteGatewayCommand command) {
        repository.deleteAllById(command.ids().stream().map(GatewayId::new).toList());
    }

}
