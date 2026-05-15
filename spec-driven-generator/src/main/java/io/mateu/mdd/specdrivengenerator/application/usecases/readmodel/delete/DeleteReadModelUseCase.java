package io.mateu.mdd.specdrivengenerator.application.usecases.readmodel.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteReadModelUseCase {

    final ReadModelRepository repository;

    public void handle(DeleteReadModelCommand command) {
        repository.deleteAllById(command.ids().stream().map(ReadModelId::new).toList());
    }
}
