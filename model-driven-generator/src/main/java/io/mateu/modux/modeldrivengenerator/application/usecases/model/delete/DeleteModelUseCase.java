package io.mateu.modux.modeldrivengenerator.application.usecases.model.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelId;
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
