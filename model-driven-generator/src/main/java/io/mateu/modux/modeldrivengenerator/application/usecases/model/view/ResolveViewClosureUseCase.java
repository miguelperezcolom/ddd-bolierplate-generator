package io.mateu.modux.modeldrivengenerator.application.usecases.model.view;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.CatalogReflection;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ViewEntity;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * Expands a {@link ViewEntity} to its dependency closure: starting from the view's members, it follows
 * every forward reference transitively (a use case pulls in its aggregates, models, events, gateways…)
 * until a fixed point. This is what makes a view safe to generate from — a raw member list is not
 * dependency-closed. See {@code docs/design/catalog-and-views.md} §6.2.
 */
@Service
@RequiredArgsConstructor
public class ResolveViewClosureUseCase {

    private final ModelStore repository;

    public record Closure(String viewId, List<String> memberIds,
                          List<String> closureIds, List<String> missingMembers) {
    }

    public Closure resolve(String viewId) {
        var view = repository.findById(viewId, ViewEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("No view with id '" + viewId + "'"));

        // A computed view derives its members from a seed element; a curated one lists them. Either way
        // the closure below does the real work — seeding with a module yields its whole bounded context,
        // seeding with a use case yields that use case plus everything it depends on.
        var members = view.isComputed() ? List.of(view.seedId()) : view.memberIds();

        var elements = repository.allElements();

        // index: any id (top-level or nested) → the top-level element that owns it
        var ownerByAnyId = new HashMap<String, Object>();
        for (var element : elements) {
            for (var id : CatalogReflection.ids(element)) {
                ownerByAnyId.putIfAbsent(id, element);
            }
        }

        var closure = new LinkedHashSet<Object>();
        var missingMembers = new ArrayList<String>();
        var frontier = new ArrayDeque<Object>();

        for (var memberId : members) {
            var owner = ownerByAnyId.get(memberId);
            if (owner == null) {
                missingMembers.add(memberId);
            } else if (closure.add(owner)) {
                frontier.add(owner);
            }
        }

        while (!frontier.isEmpty()) {
            var node = frontier.poll();
            for (var reference : CatalogReflection.references(node)) {
                var owner = ownerByAnyId.get(reference.id());
                if (owner != null && closure.add(owner)) {
                    frontier.add(owner);
                }
            }
        }

        var closureIds = closure.stream()
                .filter(Identifiable.class::isInstance)
                .map(e -> ((Identifiable) e).id())
                .sorted()
                .toList();

        return new Closure(viewId, members, closureIds, missingMembers);
    }
}
