package io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveReadModelUseCase {

    final ReadModelRepository repository;

    public void handle(SaveReadModelCommand command) {
        var readModel = repository.findById(new ReadModelId(command.id())).orElseThrow();
        readModel.update(
                new ReadModelName(command.name()),
                command.moduleId(),
                command.description(),
                command.modelId(),
                command.storageType(),
                command.consistency());
        repository.save(readModel);
    }

}
