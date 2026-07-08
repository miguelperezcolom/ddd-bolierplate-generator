package io.mateu.modux.modeldrivengenerator.application.usecases.repository.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RepositoryRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteRepositoryUseCase {

    final RepositoryRepository repository;

    public void handle(DeleteRepositoryCommand command) {
        repository.deleteAllById(command.ids().stream().map(RepositoryId::new).toList());
    }
}
