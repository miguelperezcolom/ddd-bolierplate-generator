package io.mateu.modux.specdrivengenerator.application.usecases.projection.delete;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ProjectionRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionId;
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
