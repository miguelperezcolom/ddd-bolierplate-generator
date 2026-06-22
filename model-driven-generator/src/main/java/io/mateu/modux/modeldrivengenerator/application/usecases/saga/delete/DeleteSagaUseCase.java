package io.mateu.modux.modeldrivengenerator.application.usecases.saga.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.SagaRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteSagaUseCase {

    final SagaRepository repository;

    public void handle(DeleteSagaCommand command) {
        repository.deleteAllById(command.ids().stream().map(SagaId::new).toList());
    }
}
