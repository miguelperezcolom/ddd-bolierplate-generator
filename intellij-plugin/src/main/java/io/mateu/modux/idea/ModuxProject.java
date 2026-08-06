package io.mateu.modux.idea;

import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.Nullable;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Finds the model a file belongs to.
 *
 * <p>Resolution walks up to the nearest {@code index.yaml} rather than looking at a fixed path.
 * That needs no notion of a "current project" — the state that would otherwise force a picker
 * into the UI — and it does not have to ask the IDE which workspace root a file sits under.
 * See {@code docs/design/ide-plugin.md} §4.6.
 */
public final class ModuxProject {

    /** The file that marks a directory as a modux model. */
    public static final String MARKER = "index.yaml";

    /** Where a project keeps its model, by convention. */
    public static final String CONVENTIONAL_DIR = "modux";

    /**
     * The catalog directory: the single, canonical home of the elements, at the repo root
     * (`docs/design/catalog-and-views.md` §12.3). Hidden on purpose — the navigable surface is the
     * views, and the catalog is plumbing you rarely open by hand.
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
     * The model root owning {@code file}, or null when it belongs to no model. A directory that
     * holds the marker is its own root.
     */
    public static @Nullable VirtualFile rootFor(@Nullable VirtualFile file) {
        for (var candidate = directoryOf(file); candidate != null; candidate = candidate.getParent()) {
            if (isMarker(candidate.findChild(MARKER))) return candidate;
        }
        return null;
    }

    /**
     * Whether this file is a model marker — what the editor opens on.
     *
     * <p>The name alone is not enough: {@code index.yaml} is a common name, and offering a
     * "Modux" tab on someone else's file would produce an editor that can only fail to load. What
     * makes the file a marker is what it carries — the format version and the counts per type
     * (§4.6) — so that is what is checked.
     */
    public static boolean isMarker(@Nullable VirtualFile file) {
        return file != null && !file.isDirectory() && MARKER.equals(file.getName())
                && file.getParent() != null && declaresFormatVersion(file);
    }

    /** How big a marker can plausibly be: one line per element type, and no element bodies. */
    private static final int MARKER_SIZE_LIMIT = 256 * 1024;

    private static boolean declaresFormatVersion(VirtualFile file) {
        if (file.getLength() > MARKER_SIZE_LIMIT) return false;
        try {
            return new String(file.contentsToByteArray(), StandardCharsets.UTF_8)
                    .lines()
                    .anyMatch(line -> line.startsWith("formatVersion:"));
        } catch (IOException e) {
            return false;
        }
    }

    private static @Nullable VirtualFile directoryOf(@Nullable VirtualFile file) {
        if (file == null) return null;
        return file.isDirectory() ? file : file.getParent();
    }

    /**
     * Whether a directory is a catalog: named {@code .modux} and holding the marker. The name alone
     * is not enough — a stray {@code .modux/} folder without a model inside should not answer as
     * one — so the marker is still what confirms it (§12.3 keeps {@code index.yaml} as the marker;
     * dropping it needs the loader to discover types from disk, which is a separate change).
     */
    public static boolean isCatalog(@Nullable VirtualFile dir) {
        return dir != null && dir.isDirectory() && CATALOG_DIR.equals(dir.getName())
                && isMarker(dir.findChild(MARKER));
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
}
