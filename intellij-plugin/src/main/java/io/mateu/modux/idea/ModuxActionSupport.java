package io.mateu.modux.idea;

import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.actionSystem.CommonDataKeys;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.project.ProjectUtil;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.Nullable;

/** Shared bits for the New-Modux actions: where the gesture lands, and how a name becomes an id. */
final class ModuxActionSupport {

    private ModuxActionSupport() {}

    /**
     * The directory the action acts on: the selected folder (or the folder of the selected file),
     * falling back to the project root when nothing is selected — so "New Modux model" works from
     * an empty project just as well as from a right-click on a folder.
     */
    static @Nullable VirtualFile targetDir(AnActionEvent event) {
        var selected = event.getData(CommonDataKeys.VIRTUAL_FILE);
        if (selected != null) return selected.isDirectory() ? selected : selected.getParent();
        var project = event.getProject();
        return project == null ? null : ProjectUtil.guessProjectDir(project);
    }

    /** A file-name-safe, id-safe slug from a display name: `Reservas FE` → `reservas-fe`. */
    static String slug(String name) {
        var slug = name.trim().toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-+)|(-+$)", "");
        return slug.isEmpty() ? "view" : slug;
    }

    static Project projectOf(AnActionEvent event) {
        return event.getProject();
    }
}
