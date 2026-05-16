package io.mateu.mdd.specdrivengenerator.application.usecases.readmodel.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ConsistencyLevel;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
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
                command.modelId(),
                command.storageType() != null ? ReadModelStorageType.valueOf(command.storageType()) : null,
                command.filterFields(),
                command.sortFields(),
                command.cacheable(),
                command.cacheTtlSeconds(),
                command.consistencyLevel() != null ? ConsistencyLevel.valueOf(command.consistencyLevel()) : null,
                command.maxStalenessMs(),
                command.indexFields());
        repository.save(readModel);
    }
}
