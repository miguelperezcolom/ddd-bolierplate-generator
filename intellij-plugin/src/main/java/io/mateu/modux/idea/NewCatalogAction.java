package io.mateu.modux.idea;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.ui.Messages;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;

/**
 * Initialise a modux catalog: create {@code .modux/} with its marker at the chosen directory
 * (§12.3). The catalog is the single, canonical home of the elements; views come next, as their
 * own documents.
 */
public final class NewCatalogAction extends AnAction {

    @Override
    public void actionPerformed(@NotNull AnActionEvent event) {
        var project = event.getProject();
        var dir = ModuxActionSupport.targetDir(event);
        if (project == null || dir == null) return;

        if (dir.findChild(ModuxProject.CATALOG_DIR) != null) {
            Messages.showInfoMessage(project, "Ya hay un " + ModuxProject.CATALOG_DIR
                    + "/ en " + dir.getPath() + ".", "Modux");
            return;
        }
        try {
            // Just the directory: its name is the marker, and the buckets appear as elements are
            // added (§12.3). No index file to seed.
            var catalog = WriteCommandAction.writeCommandAction(project)
                    .withName("Init Modux Catalog")
                    .<VirtualFile, IOException>compute(() -> dir.createChildDirectory(this, ModuxProject.CATALOG_DIR));
            Messages.showInfoMessage(project, "Catálogo creado en " + catalog.getPath()
                    + ".\nCrea una vista con New → Modux View.", "Modux");
        } catch (IOException e) {
            Messages.showErrorDialog(project, "No se pudo crear el catálogo: " + e.getMessage(), "Modux");
        }
    }
}
