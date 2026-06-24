package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AllData;

import java.nio.file.Path;

/**
 * A way to read/write the whole model ({@link AllData}) to disk. Two implementations: the original
 * single-file YAML and the granular file tree (one file per element). The in-memory catalog is
 * unaffected — only how it is persisted differs. See {@code docs/design/catalog-and-views.md}.
 */
public interface ModelStorageFormat {

    /** Whether this format owns the given path (e.g. a directory vs. a single file). */
    boolean handles(Path path);

    AllData load(Path path) throws Exception;

    void save(Path path, AllData data) throws Exception;

    /** Directory next to which sibling artifacts (the JSON schema) are written. */
    Path dataDir(Path path);
}
