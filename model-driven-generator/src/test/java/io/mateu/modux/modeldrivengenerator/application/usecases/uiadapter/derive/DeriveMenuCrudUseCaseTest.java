package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.derive;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.page.derive.DerivePageUseCasesUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Pageable;
import io.mateu.uidl.interfaces.Identifiable;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * A menu entry that targets an aggregate is the «this app manages that aggregate» intention;
 * deriving it materializes a CRUD page bound to the aggregate, cascades the listing query and the
 * shared CRUD trio + lifecycle events (via the page derivation), and rewires the entry to OPEN the
 * page while clearing the aggregate target (so nothing double-renders). Idempotent.
 */
class DeriveMenuCrudUseCaseTest {

    private final FakeStore store = new FakeStore();
    private final DeriveMenuCrudUseCase useCase =
            new DeriveMenuCrudUseCase(store, new DerivePageUseCasesUseCase(store));

    private void seedReservaInAppMenu() {
        store.save(new AggregateEntity("agg-reserva", "Reserva", "m-reserva", null, null, null, null,
                false, false, null, List.of(), List.of(), List.of(), null, false));
        store.save(BoundedContextEntity.builder().id("bc").name("Reservas")
                .aggregateIds(List.of("agg-reserva")).build());
        store.save(UiAdapterEntity.builder().id("app-back").name("Backoffice")
                .menuItems(List.of(new UiMenuItemEntity("Reservas", null, null, null, null, List.of(),
                        "mi-1", null, null, "agg-reserva", null, null)))
                .build());
    }

    @Test
    void materializes_the_crud_page_cascade_and_rewires_the_menu_entry() {
        seedReservaInAppMenu();

        useCase.handle();

        // the CRUD page exists, bound to the aggregate, with the listing query wired by the cascade
        var page = store.findById("pg-crud-agg-reserva", PageEntity.class).orElseThrow();
        assertEquals("CRUD", page.type());
        assertEquals("agg-reserva", page.aggregateId());
        assertEquals("qs-crud-agg-reserva", page.listingQueryServiceId());
        assertTrue(store.findById("qs-crud-agg-reserva", QueryServiceEntity.class).isPresent());

        // the shared CRUD trio (same ids as the actor→aggregate gesture) is present
        assertTrue(store.findById("uc-crearAgg-reserva", UseCaseEntity.class).isPresent());
        assertTrue(store.findById("uc-actualizarAgg-reserva", UseCaseEntity.class).isPresent());
        assertTrue(store.findById("uc-eliminarAgg-reserva", UseCaseEntity.class).isPresent());

        // the menu entry now OPENS the page and no longer targets the aggregate (no double render)
        var entry = store.findById("app-back", UiAdapterEntity.class).orElseThrow()
                .menuItems().get(0);
        assertEquals("pg-crud-agg-reserva", entry.pageId());
        assertNull(entry.aggregateId());
    }

    @Test
    void is_idempotent() {
        seedReservaInAppMenu();
        useCase.handle();
        var pagesAfterFirst = store.findAllOfType(PageEntity.class).size();

        useCase.handle();

        assertEquals(pagesAfterFirst, store.findAllOfType(PageEntity.class).size());
        // second run finds no aggregate-targeted entry left → nothing to change
        assertNull(store.findById("app-back", UiAdapterEntity.class).orElseThrow()
                .menuItems().get(0).aggregateId());
    }

    /** A minimal in-memory catalog: upsert by id, query by type — enough for the derivation. */
    private static final class FakeStore implements ModelStore {
        private final Map<Class<?>, Map<String, Object>> data = new LinkedHashMap<>();

        @Override
        @SuppressWarnings("unchecked")
        public <T> Optional<T> findById(String id, Class<T> type) {
            return Optional.ofNullable((T) data.getOrDefault(type, Map.of()).get(id));
        }

        @Override
        public void save(Identifiable element) {
            data.computeIfAbsent(element.getClass(), k -> new LinkedHashMap<>()).put(element.id(), element);
        }

        @Override
        public void putTransient(Identifiable element) {
            save(element);
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> List<T> findAllOfType(Class<T> type) {
            return new ArrayList<>((Collection<T>) data.getOrDefault(type, Map.of()).values());
        }

        @Override
        public <T> void deleteAllById(List<String> ids, Class<T> type) {
            var byId = data.get(type);
            if (byId != null) ids.forEach(byId::remove);
        }

        @Override
        public <T> ListingData<T> findAll(String searchText, Object filters, Pageable pageable, Class<T> type) {
            throw new UnsupportedOperationException();
        }

        @Override
        public Collection<Object> allElements() {
            throw new UnsupportedOperationException();
        }

        @Override
        public AllData snapshot() {
            throw new UnsupportedOperationException();
        }

        @Override
        public void replaceWith(AllData data) {
            throw new UnsupportedOperationException();
        }

        @Override
        public Path storePath() {
            throw new UnsupportedOperationException();
        }

        @Override
        public boolean startedFromScratch() {
            throw new UnsupportedOperationException();
        }

        @Override
        public void reload() {
            throw new UnsupportedOperationException();
        }
    }
}
