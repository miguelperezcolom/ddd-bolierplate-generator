package io.mateu.modux.idea;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorPolicy;
import com.intellij.openapi.fileEditor.FileEditorProvider;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.ui.jcef.JBCefApp;
import org.jetbrains.annotations.NotNull;

/**
 * Offers the graphical editor for a model marker.
 *
 * <p>It is offered alongside the plain YAML editor rather than replacing it: {@code index.yaml}
 * is still a text file, and being able to read it as text is part of the point of keeping the
 * model in the repository.
 */
public final class ModuxFileEditorProvider implements FileEditorProvider {

    @Override
    public boolean accept(@NotNull Project project, @NotNull VirtualFile file) {
        // The marker opens the whole model; an element file opens it focused on that component.
        return (ModuxProject.isMarker(file) || ModuxProject.elementFileOf(file) != null)
                && JBCefApp.isSupported();
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
        return FileEditorPolicy.PLACE_AFTER_DEFAULT_EDITOR;
    }
}
