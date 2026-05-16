package io.mateu.modux.specdrivengenerator.application.usecases.saga.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.SagaRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.saga.vo.SagaId;
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
