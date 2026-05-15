package io.mateu.mdd.specdrivengenerator.application.usecases.projection.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.*;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.ProjectionStorageType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaveProjectionUseCase {

    final ProjectionRepository repository;

    public void handle(SaveProjectionCommand command) {
        var projection = repository.findById(new ProjectionId(command.id())).orElseThrow();
        projection.update(
                new ProjectionName(command.name()),
                command.modelId() != null ? new ProjectionModelId(command.modelId()) : null,
                command.storageType() != null ? ProjectionStorageType.valueOf(command.storageType()) : null,
                toHandlers(command.handlers()));
        repository.save(projection);
    }

    private List<ProjectionEventHandler> toHandlers(List<ProjectionEventHandlerData> handlers) {
        if (handlers == null) return List.of();
        return handlers.stream()
                .map(h -> new ProjectionEventHandler(h.id(), h.name(), h.domainEventId(), h.type(), h.modelMappingId()))
                .toList();
    }
}
