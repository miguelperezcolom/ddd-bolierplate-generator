package io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateReadModelUseCase {

    final ReadModelRepository repository;

    public void handle(CreateReadModelCommand command) {
        var readModel = ReadModel.of(
                new ReadModelId(command.id()),
                new ReadModelName(command.name()),
                command.moduleId(),
                command.description(),
                command.modelId(),
                command.storageType(),
                command.consistency());
        repository.save(readModel);
    }

}
