package io.mateu.modux.modeldrivengenerator.application.usecases.model.view;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.CatalogReflection;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ViewEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Partial (lazy) load: loads only a view's dependency closure into memory from a granular store,
 * instead of the whole model — so a single bounded context of a huge model can be opened without
 * loading everything. The catalog is read-only afterwards (see {@code docs/design/catalog-and-views.md}
 * §5.4). It interleaves loading and reference-following: load the seed/members, load whatever they
 * reference, and repeat until the closure is in memory.
 */
@Service
@RequiredArgsConstructor
public class LoadViewScopeUseCase {

    private final CommonFileRepository repository;

    public record ScopeLoad(String viewId, List<String> members, int loadedElements, List<String> missing) {
    }

    public ScopeLoad load(String viewId) {
        repository.beginScopedLoad();

        // views are few — load them all to find the target
        repository.loadTypeIntoStore("views");
        var view = repository.findById(viewId, ViewEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("No view with id '" + viewId + "'"));
        var members = view.isComputed() ? List.of(view.seedId()) : view.memberIds();

        var queue = new ArrayDeque<>(members);
        var visited = new HashSet<String>();
        var missing = new ArrayList<String>();
        var loaded = 0;

        while (!queue.isEmpty()) {
            var id = queue.poll();
            if (!visited.add(id)) continue;

            var element = repository.loadElementIntoStore(id);
            if (element == null) {
                // a nested id (e.g. a gateway operation) has no file of its own; its owner is reached
                // through a sibling reference. Only a curated member that resolves to nothing is missing.
                if (members.contains(id)) missing.add(id);
                continue;
            }
            loaded++;
            for (var reference : CatalogReflection.references(element)) {
                queue.add(reference.id());
            }
        }
        return new ScopeLoad(viewId, members, loaded, missing);
    }
}
