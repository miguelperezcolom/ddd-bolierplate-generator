package io.mateu.modux.modeldrivengenerator.infra.out.persistence.home;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.RepositoryRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RepositoryHomeRepository implements RepositoryRepository {

    final ModuxHomeStore store;

    @Override
    public Optional<Repository> findById(RepositoryId id) {
        return store.loadRepositories().stream()
                .filter(e -> e.id().equals(id.id()))
                .findFirst()
                .map(e -> Repository.load(e.id(), e.name(), e.type(), e.folder(), e.gitUrl(),
                        e.branch(), e.jdbcUrl(), e.description()));
    }

    @Override
    public Repository save(Repository entity) {
        var repositories = new ArrayList<>(store.loadRepositories());
        var record = new RepositoryEntity(entity.getId().id(), entity.getName().name(),
                entity.getType() != null ? entity.getType().name() : null,
                entity.getFolder(), entity.getGitUrl(), entity.getBranch(), entity.getJdbcUrl(),
                entity.getDescription());
        var existing = repositories.stream()
                .filter(e -> e.id().equals(record.id()))
                .findFirst().orElse(null);
        if (existing != null) {
            repositories.set(repositories.indexOf(existing), record);
        } else {
            repositories.add(record);
        }
        store.saveRepositories(repositories);
        return entity;
    }

    @Override
    public void deleteAllById(List<RepositoryId> selectedIds) {
        var ids = selectedIds.stream().map(RepositoryId::id).toList();
        store.saveRepositories(store.loadRepositories().stream()
                .filter(e -> !ids.contains(e.id()))
                .toList());
    }
}
