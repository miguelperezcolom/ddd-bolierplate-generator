package io.mateu.modux.idea;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.command.WriteCommandAction;
import com.intellij.openapi.ui.Messages;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

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
            var catalog = WriteCommandAction.writeCommandAction(project)
                    .withName("Init Modux Catalog")
                    .<VirtualFile, IOException>compute(() -> {
                        var created = dir.createChildDirectory(this, ModuxProject.CATALOG_DIR);
                        var index = created.createChildData(this, ModuxProject.MARKER);
                        index.setBinaryContent("formatVersion: 1\ncounts: {}\n".getBytes(StandardCharsets.UTF_8));
                        return created;
                    });
            Messages.showInfoMessage(project, "Catálogo creado en " + catalog.getPath()
                    + ".\nCrea una vista con New → Modux View.", "Modux");
        } catch (IOException e) {
            Messages.showErrorDialog(project, "No se pudo crear el catálogo: " + e.getMessage(), "Modux");
        }
    }
}
