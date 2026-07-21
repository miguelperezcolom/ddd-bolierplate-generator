package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Which catalog elements were born as machine-made stubs rather than declared by hand:
 * the use cases an actor-CRUD or a page derivation creates, the query service a
 * listing derives, and an aggregate's lifecycle domain events. Derivers use
 * deterministic ids on purpose ("re-deriving updates instead of duplicating"), so the
 * mark can be COMPUTED from those conventions instead of persisted — it marks stubs
 * authored before this existed, and a rename never loses it. Computed once per
 * projection, then queried per element.
 */
public record DerivedElementIds(
        Set<String> exactUseCaseIds,
        Set<String> useCaseIdPrefixes,
        Set<String> queryServiceIds,
        Set<String> domainEventIds) {

    public static DerivedElementIds from(List<String> aggregateIds, List<String> pageIds) {
        var useCases = new HashSet<String>();
        var useCasePrefixes = new HashSet<String>();
        var queryServices = new HashSet<String>();
        var domainEvents = new HashSet<String>();
        for (var aggregateId : aggregateIds) {
            // CrudUseCases: the CRUD trio shared by the actor→aggregate gesture and the
            // UI→aggregate / CRUD-page derivation (one convention, no duplicates).
            var cap = EditorApiController.capitalize(aggregateId);
            useCases.add("uc-crear" + cap);
            useCases.add("uc-actualizar" + cap);
            useCases.add("uc-eliminar" + cap);
            // CrudListingQuery: the one canonical listing query the UI page and CRUD API share.
            queryServices.add("qs-crud-" + aggregateId);
            // CrudLifecycleEvents: the lifecycle domain events (both participle genders).
            for (var stem : List.of("Cread", "Modificad", "Eliminad")) {
                domainEvents.add("ev-" + aggregateId + stem + "o");
                domainEvents.add("ev-" + aggregateId + stem + "a");
            }
        }
        for (var pageId : pageIds) {
            // PageUseCaseDerivation: a stub per button (uc-{pageId}-{kebab-label}) and the
            // listing's query service.
            useCasePrefixes.add("uc-" + pageId + "-");
            queryServices.add("qs-" + pageId);
        }
        return new DerivedElementIds(useCases, useCasePrefixes, queryServices, domainEvents);
    }

    public boolean isDerivedUseCase(String id) {
        return exactUseCaseIds.contains(id) || useCaseIdPrefixes.stream().anyMatch(id::startsWith);
    }

    public boolean isDerivedQueryService(String id) {
        return queryServiceIds.contains(id);
    }

    public boolean isDerivedDomainEvent(String id) {
        return domainEventIds.contains(id);
    }
}
