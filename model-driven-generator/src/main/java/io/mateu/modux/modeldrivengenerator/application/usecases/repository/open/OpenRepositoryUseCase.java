package io.mateu.modux.modeldrivengenerator.application.usecases.repository.open;

import io.mateu.modux.modeldrivengenerator.application.out.ProjectStorePort;
import io.mateu.modux.modeldrivengenerator.application.out.repositories.RepositoryRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class OpenRepositoryUseCase {

    final RepositoryRepository repository;
    final ProjectStorePort projectStore;

    public Path handle(String repositoryId) {
        var repo = repository.findById(new RepositoryId(repositoryId))
                .orElseThrow(() -> new IllegalArgumentException(
                        "Repositorio desconocido: " + repositoryId));
        return projectStore.open(repo);
    }
}
