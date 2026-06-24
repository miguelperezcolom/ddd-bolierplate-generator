package io.mateu.modux.modeldrivengenerator.application.usecases.projection.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.projection.ProjectionEventHandlerData;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.*;
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
                command.readModelId() != null ? new ProjectionReadModelId(command.readModelId()) : null,
                toHandlers(command.handlers()),
                command.rebuildStrategy() != null ? RebuildStrategy.valueOf(command.rebuildStrategy()) : null,
                command.errorHandlingStrategy() != null ? ErrorHandlingStrategy.valueOf(command.errorHandlingStrategy()) : null,
                command.maxRetries(),
                command.snapshotEnabled(), command.snapshotFrequency());
        repository.save(projection);
    }

    private List<ProjectionEventHandler> toHandlers(List<ProjectionEventHandlerData> handlers) {
        if (handlers == null) return List.of();
        return handlers.stream()
                .map(h -> new ProjectionEventHandler(h.id(), h.name(), h.domainEventId(), h.type(), h.modelMappingId()))
                .toList();
    }
}
