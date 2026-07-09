package io.mateu.modux.modeldrivengenerator.application.usecases.repository.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RepositoryRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateRepositoryUseCase {

    final RepositoryRepository repository;

    public void handle(CreateRepositoryCommand command) {
        repository.save(Repository.of(
                new RepositoryId(command.id()),
                new RepositoryName(command.name()),
                command.type(),
                command.folder(),
                command.gitUrl(),
                command.branch(), command.jdbcUrl(),
                command.description()));
    }
}
