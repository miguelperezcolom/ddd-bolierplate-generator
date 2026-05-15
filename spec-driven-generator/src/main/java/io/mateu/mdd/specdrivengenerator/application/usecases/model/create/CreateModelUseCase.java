package io.mateu.mdd.specdrivengenerator.application.usecases.model.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateModelUseCase {

    final ModelRepository repository;

    public void handle(CreateModelCommand command) {
        var model = Model.of(
                new ModelId(command.id()),
                new ModelName(command.name()));
        repository.save(model);
    }

}
