package io.mateu.modux.idea;

import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.Nullable;

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

    private ModuxProject() {}

    /**
     * The model root owning {@code file}, or null when it belongs to no model. A directory that
     * holds the marker is its own root.
     */
    public static @Nullable VirtualFile rootFor(@Nullable VirtualFile file) {
        for (var candidate = directoryOf(file); candidate != null; candidate = candidate.getParent()) {
            if (candidate.findChild(MARKER) != null) return candidate;
        }
        return null;
    }

    /** Whether this file is a model marker — what the editor opens on. */
    public static boolean isMarker(@Nullable VirtualFile file) {
        return file != null && !file.isDirectory() && MARKER.equals(file.getName())
                && file.getParent() != null;
    }

    private static @Nullable VirtualFile directoryOf(@Nullable VirtualFile file) {
        if (file == null) return null;
        return file.isDirectory() ? file : file.getParent();
    }
}
