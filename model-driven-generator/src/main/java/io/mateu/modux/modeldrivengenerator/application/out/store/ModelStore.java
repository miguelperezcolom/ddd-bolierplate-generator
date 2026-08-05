package io.mateu.modux.modeldrivengenerator.application.out.store;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;
import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.nio.file.Path;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * The model catalog port (docs/design/storage-ports.md): every element of the spec,
 * keyed by (type, id), whatever persists it underneath — YAML files (monolithic or
 * granular), or a database, chosen per repository. Application code depends on this;
 * only infrastructure knows where the bytes live.
 */
public interface ModelStore {

    <T> Optional<T> findById(String id, Class<T> type);

    void save(Identifiable element);

    /** Into the in-memory catalog only, never persisted (transient/derived data). */
    void putTransient(Identifiable element);


    <T> List<T> findAllOfType(Class<T> type);

    /** Every catalog element currently loaded (all types), for whole-model passes. */
    Collection<Object> allElements();

    <T> void deleteAllById(List<String> ids, Class<T> type);

    /** The loaded model as an {@link AllData} — a read-only snapshot of the catalog. */
    AllData snapshot();

    /** Replace the whole catalog with the given model and persist it (semantic merges). */
    void replaceWith(AllData data);

    /**
     * Location hint of the open store. Meaningful for file-backed repositories (the
     * YAML file or granular directory); database-backed stores return their last
     * file location, which callers must treat as a hint, never as the truth.
     */
    Path storePath();

    /** True when no store existed at load time (authoring from scratch). */
    boolean startedFromScratch();

    /** Re-read the catalog from the underlying persistence, discarding transient state. */
    void reload();
}
