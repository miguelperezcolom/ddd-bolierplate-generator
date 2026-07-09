package io.mateu.modux.modeldrivengenerator.infra.out.persistence.home;

import io.mateu.modux.modeldrivengenerator.application.out.query.RepositoryQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryRow;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RepositoryHomeQueryService implements RepositoryQueryService {

    final ModuxHomeStore store;

    @Override
    public ListingData<RepositoryRow> findAll(String searchText, Object filters, Pageable pageable) {
        var needle = searchText == null ? "" : searchText.trim().toLowerCase();
        var matching = store.loadRepositories().stream()
                .filter(e -> needle.isEmpty()
                        || (e.name() != null && e.name().toLowerCase().contains(needle))
                        || (e.folder() != null && e.folder().toLowerCase().contains(needle))
                        || (e.gitUrl() != null && e.gitUrl().toLowerCase().contains(needle)))
                .toList();
        var rows = matching.stream()
                .skip((long) pageable.page() * pageable.size())
                .limit(pageable.size())
                .map(e -> new RepositoryRow(e.id(), e.name(), inferredType(e), e.folder(), e.gitUrl()))
                .toList();
        return new ListingData<>(new Page<>(searchText, pageable.size(), pageable.page(),
                matching.size(), rows));
    }

    private static String inferredType(RepositoryEntity e) {
        if (e.type() != null && !e.type().isBlank()) return e.type();
        return e.gitUrl() != null && !e.gitUrl().isBlank() ? "GIT" : "LOCAL";
    }

    @Override
    public String getLabel(String id) {
        return store.loadRepositories().stream()
                .filter(e -> e.id().equals(id))
                .map(RepositoryEntity::name)
                .findFirst().orElseThrow();
    }

    @Override
    public Optional<RepositoryDto> getById(String id) {
        return store.loadRepositories().stream()
                .filter(e -> e.id().equals(id))
                .findFirst()
                .map(e -> new RepositoryDto(e.id(), e.name(), inferredType(e), e.folder(), e.gitUrl(),
                        e.branch(), e.jdbcUrl(), e.description()));
    }
}
