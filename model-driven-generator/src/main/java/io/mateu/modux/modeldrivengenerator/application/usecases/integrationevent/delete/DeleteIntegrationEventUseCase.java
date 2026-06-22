package io.mateu.modux.modeldrivengenerator.application.usecases.integrationevent.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.IntegrationEventRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteIntegrationEventUseCase {

    final IntegrationEventRepository repository;

    public void handle(DeleteIntegrationEventCommand command) {
        repository.deleteAllById(command.ids().stream().map(IntegrationEventId::new).toList());
    }

}
