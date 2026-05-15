package io.mateu.mdd.specdrivengenerator.application.usecases.projection.delete;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.ProjectionId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteProjectionUseCase {

    final ProjectionRepository repository;

    public void handle(DeleteProjectionCommand command) {
        repository.deleteAllById(command.ids().stream().map(ProjectionId::new).toList());
    }
}
