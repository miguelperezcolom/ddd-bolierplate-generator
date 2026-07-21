package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.derive;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.page.derive.DerivePageUseCasesUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * The UI half of the CRUD intent, symmetric to the actor→aggregate gesture: a menu entry that
 * targets an AGGREGATE is the intention «this app manages that aggregate». This materializes it —
 * a CRUD {@link PageEntity} (deterministic id {@code pg-crud-{aggregateId}}) bound to the aggregate
 * — and rewires the entry to OPEN that page (clearing the aggregate target so the running app and
 * the editor render one thing, not two). The page then goes through {@link DerivePageUseCasesUseCase},
 * which cascades the listing query service, the shared CRUD use cases (see {@code CrudUseCases}) and
 * the lifecycle domain events. Deterministic ids → idempotent: re-running derives nothing new, and a
 * hand-authored menu→aggregate intention materializes exactly like the gesture's. Runs for one app
 * (the automatic hook after the UI-CRUD gesture) or for every app (the manual «Derive» button).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DeriveMenuCrudUseCase {

    final ModelStore repository;
    final DerivePageUseCasesUseCase derivePageUseCases;

    /** Materializes the menu→aggregate intentions of every app. Returns a human summary. */
    public String handle() {
        int apps = 0;
        for (var app : repository.findAllOfType(UiAdapterEntity.class)) {
            if (deriveApp(app)) apps++;
        }
        var summary = apps + " apps con CRUD de UI materializado desde el menú.";
        log.info("Menu→aggregate CRUD derivation: {}", summary);
        return summary;
    }

    /** Materializes one app's menu→aggregate intentions — the automatic hook after the gesture. */
    public void handle(String appId) {
        repository.findById(appId, UiAdapterEntity.class).ifPresent(this::deriveApp);
    }

    private boolean deriveApp(UiAdapterEntity app) {
        var changed = new boolean[]{false};
        var items = deriveMenu(app.menuItems(), changed);
        if (changed[0]) repository.save(app.toBuilder().menuItems(items).build());
        return changed[0];
    }

    /** Walks the menu forest, rewiring every aggregate-targeted entry to its materialized CRUD page. */
    private List<UiMenuItemEntity> deriveMenu(List<UiMenuItemEntity> items, boolean[] changed) {
        if (items == null || items.isEmpty()) return items;
        var out = new ArrayList<UiMenuItemEntity>();
        for (var item : items) {
            var children = deriveMenu(item.children(), changed);
            var aggregateId = item.aggregateId();
            var untargeted = item.pageId() == null || item.pageId().isBlank();
            if (aggregateId != null && !aggregateId.isBlank() && untargeted) {
                var aggregate = repository.findById(aggregateId, AggregateEntity.class).orElse(null);
                if (aggregate != null) {
                    var pageId = ensureCrudPage(aggregate);
                    changed[0] = true;
                    out.add(new UiMenuItemEntity(item.label(), item.icon(), item.description(),
                            item.route(), pageId, children, item.id(), item.uiAdapterId(),
                            item.useCaseId(), null, item.queryServiceId(), item.queryOperationId()));
                    continue;
                }
            }
            out.add(withChildren(item, children));
        }
        return out;
    }

    /** The CRUD page for an aggregate — created (and cascaded) once, then reused. Returns its id. */
    private String ensureCrudPage(AggregateEntity aggregate) {
        var pageId = "pg-crud-" + aggregate.id();
        if (repository.findById(pageId, PageEntity.class).isEmpty()) {
            repository.save(new PageEntity(pageId, aggregate.name(), "/" + aggregate.id(), "CRUD",
                    aggregate.id(), aggregate.modelId(),
                    null, null, null, List.of(),
                    null, null, null, null, null, null, null, null, null));
            // The page implies the whole scaffolding: listing query, CRUD use cases, lifecycle events.
            derivePageUseCases.handle(pageId);
        }
        return pageId;
    }

    private static UiMenuItemEntity withChildren(UiMenuItemEntity it, List<UiMenuItemEntity> children) {
        return new UiMenuItemEntity(it.label(), it.icon(), it.description(), it.route(),
                it.pageId(), children, it.id(), it.uiAdapterId(), it.useCaseId(),
                it.aggregateId(), it.queryServiceId(), it.queryOperationId());
    }
}
