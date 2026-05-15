package io.mateu.mdd.specdrivengenerator.application.usecases.readmodel.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
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
                command.modelId(),
                command.filterFields(),
                command.sortFields(),
                command.cacheable(),
                command.cacheTtlSeconds());
        repository.save(readModel);
    }
}
