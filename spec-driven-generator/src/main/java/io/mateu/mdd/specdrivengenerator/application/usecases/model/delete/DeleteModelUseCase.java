package io.mateu.mdd.specdrivengenerator.application.usecases.model.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteModelUseCase {

    final ModelRepository repository;

    public void handle(DeleteModelCommand command) {
        repository.deleteAllById(command.ids().stream().map(ModelId::new).toList());
    }

}
