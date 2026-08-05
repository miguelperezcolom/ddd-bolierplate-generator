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
}
