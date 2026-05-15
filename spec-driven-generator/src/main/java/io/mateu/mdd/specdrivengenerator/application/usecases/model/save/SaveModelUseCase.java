package io.mateu.mdd.specdrivengenerator.application.usecases.model.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveModelUseCase {

    final ModelRepository repository;

    public void handle(SaveModelCommand command) {
        var model = repository.findById(new ModelId(command.id())).orElseThrow();
        model.update(new ModelName(command.name()));
        repository.save(model);
    }

}
