package io.mateu.modux.specdrivengenerator.application.usecases.readmodel.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ReadModelRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ConsistencyLevel;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelName;
import io.mateu.modux.specdrivengenerator.domain.aggregates.readmodel.vo.ReadModelStorageType;
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
