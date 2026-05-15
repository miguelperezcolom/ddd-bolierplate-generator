package io.mateu.mdd.specdrivengenerator.application.usecases.model.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveModelUseCase {

    final ModelRepository repository;

    public void handle(SaveModelCommand command) {
        var model = repository.findById(new ModelId(command.id())).orElseThrow();
        var fields = command.fields() == null ? List.<ModelField>of() :
                command.fields().stream()
                        .map(f -> new ModelField(f.id(), f.name(), f.basicType(), f.type(), f.modelId()))
                        .toList();
        model.update(new ModelName(command.name()), fields);
        repository.save(model);
    }

}
