package io.mateu.mdd.specdrivengenerator.application.usecases.projection.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.mdd.specdrivengenerator.application.usecases.projection.ProjectionEventHandlerData;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.Projection;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateProjectionUseCase {

    final ProjectionRepository repository;

    public void handle(CreateProjectionCommand command) {
        var projection = Projection.of(
                new ProjectionId(command.id()),
                new ProjectionName(command.name()),
                command.modelId() != null ? new ProjectionModelId(command.modelId()) : null,
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
