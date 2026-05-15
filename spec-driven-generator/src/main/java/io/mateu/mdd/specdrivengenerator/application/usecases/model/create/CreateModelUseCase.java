package io.mateu.mdd.specdrivengenerator.application.usecases.model.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateModelUseCase {

    final ModelRepository repository;

    public void handle(CreateModelCommand command) {
        var fields = command.fields() == null ? List.<ModelField>of() :
                command.fields().stream()
                        .map(f -> new ModelField(f.id(), f.name(), f.basicType(), f.type(), f.modelId()))
                        .toList();
        var model = Model.of(
                new ModelId(command.id()),
                new ModelName(command.name()),
                fields);
        repository.save(model);
    }

}
