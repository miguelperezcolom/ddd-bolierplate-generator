package io.mateu.modux.modeldrivengenerator.application.usecases.project.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProjectRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteProjectUseCase {

    final ProjectRepository repository;

    public void handle(DeleteProjectCommand command) {
        repository.deleteAllById(command.ids().stream().map(ProjectId::new).toList());
    }

}
