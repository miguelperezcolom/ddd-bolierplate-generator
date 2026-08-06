package io.mateu.modux.idea;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorPolicy;
import com.intellij.openapi.fileEditor.FileEditorProvider;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.ui.jcef.JBCefApp;
import org.jetbrains.annotations.NotNull;

/**
 * Offers the graphical editor for a view document ({@code *.modux-view.yaml}, §12).
 *
 * <p>Graphics first (see {@link #getPolicy()}), with the raw YAML still one tab away — a view is a
 * canvas, and reading it as text stays possible on purpose. The catalog itself is not offered here:
 * it is data, and opens as plain YAML.
 */
public final class ModuxFileEditorProvider implements FileEditorProvider {

    @Override
    public boolean accept(@NotNull Project project, @NotNull VirtualFile file) {
        // The graphical editor opens on a view document (§12), not on the catalog — the catalog is
        // data, and opens as plain YAML.
        return ModuxProject.isViewDocument(file) && JBCefApp.isSupported();
    }

    @Override
    public @NotNull FileEditor createEditor(@NotNull Project project, @NotNull VirtualFile file) {
        return new ModuxFileEditor(project, file);
    }

    @Override
    public @NotNull String getEditorTypeId() {
        return "modux-model-editor";
    }

    @Override
    public @NotNull FileEditorPolicy getPolicy() {
        // A view document is a canvas: show the graphical editor first, with the raw YAML still one
        // tab away. (The catalog, by contrast, is data and is not offered here at all.)
        return FileEditorPolicy.PLACE_BEFORE_DEFAULT_EDITOR;
    }
}
