package io.mateu.modux.modeldrivengenerator.application.usecases.repository.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RepositoryRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveRepositoryUseCase {

    final RepositoryRepository repository;

    public void handle(SaveRepositoryCommand command) {
        var entity = repository.findById(new RepositoryId(command.id())).orElseThrow();
        entity.update(new RepositoryName(command.name()), command.type(), command.folder(),
                command.gitUrl(), command.branch(), command.description());
        repository.save(entity);
    }
}
