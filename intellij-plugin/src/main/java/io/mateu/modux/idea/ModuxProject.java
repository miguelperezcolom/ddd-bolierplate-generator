package io.mateu.modux.idea;

import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.Nullable;

/**
 * Finds the catalog a file belongs to, and tells a view document from anything else.
 *
 * <p>A modux model is a catalog — the elements — in a {@code .modux/} directory at the repo root
 * (§12.3). The directory's <em>name</em> is the marker: unambiguous, so no index file or content
 * check is needed. Resolution walks up to the nearest {@code .modux/}, the same "nearest marker"
 * idea as before, with the directory as the marker. See {@code docs/design/catalog-and-views.md}
 * §12 and {@code docs/design/ide-plugin.md} §4.6.
 */
public final class ModuxProject {

    /**
     * The catalog directory: the single, canonical home of the elements, at the repo root. Hidden
     * on purpose — the navigable surface is the views, and the catalog is plumbing you rarely open
     * by hand.
     */
    public static final String CATALOG_DIR = ".modux";

    /**
     * The suffix of a view document: a saved perspective ({@code viewId} + lens + geometry) that
     * references a catalog view (§12.2). It ends in {@code .yaml} so editors and schema tooling
     * treat it as YAML; {@code modux-view} makes it unambiguous and greppable. This is what the
     * graphical editor opens on — not the catalog, which is data.
     */
    public static final String VIEW_SUFFIX = ".modux-view.yaml";

    private ModuxProject() {}

    /**
     * Whether a directory is a catalog: named {@code .modux} (§12.3). The name alone is the marker —
     * there is no index file to check — which is why a stray {@code .modux/} is the only false
     * positive, and an unlikely one for a name this specific.
     */
    public static boolean isCatalog(@Nullable VirtualFile dir) {
        return dir != null && dir.isDirectory() && CATALOG_DIR.equals(dir.getName());
    }

    /**
     * The catalog owning {@code file}: walking up, the first ancestor that <em>holds</em> a
     * {@code .modux/}. Like finding {@code .git} — the catalog sits at the repo root, and a view
     * document lives off to the side (in {@code docs/}, next to code…), so a walk that only matched
     * an ancestor <em>named</em> {@code .modux} would never reach it. What binds a view to a model
     * is not its path but the catalog it resolves to.
     */
    public static @Nullable VirtualFile catalogRootFor(@Nullable VirtualFile file) {
        for (var candidate = directoryOf(file); candidate != null; candidate = candidate.getParent()) {
            var catalog = candidate.findChild(CATALOG_DIR);
            if (isCatalog(catalog)) return catalog;
        }
        return null;
    }

    /** Whether this file is a view document — what the graphical editor opens on. */
    public static boolean isViewDocument(@Nullable VirtualFile file) {
        return file != null && !file.isDirectory() && file.getName().endsWith(VIEW_SUFFIX);
    }

    private static @Nullable VirtualFile directoryOf(@Nullable VirtualFile file) {
        if (file == null) return null;
        return file.isDirectory() ? file : file.getParent();
    }
}
