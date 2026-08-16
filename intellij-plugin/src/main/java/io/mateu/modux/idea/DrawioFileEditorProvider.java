package io.mateu.modux.idea;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorPolicy;
import com.intellij.openapi.fileEditor.FileEditorProvider;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.ui.jcef.JBCefApp;
import org.jetbrains.annotations.NotNull;

/**
 * Offers draw.io as a SECOND editor for a view document ({@code *.modux-view.yaml}), beside the
 * modux canvas ({@link ModuxFileEditorProvider}).
 *
 * <p>Both providers accept the same file, so the IDE shows both as tabs at the bottom of the editor:
 * the modux canvas first, draw.io next, raw YAML last. This is the strategic-tier surface — you draw
 * the landscape in draw.io, and it writes the same {@code .modux} model.
 */
public final class DrawioFileEditorProvider implements FileEditorProvider {

    @Override
    public boolean accept(@NotNull Project project, @NotNull VirtualFile file) {
        return ModuxProject.isViewDocument(file) && JBCefApp.isSupported();
    }

    @Override
    public @NotNull FileEditor createEditor(@NotNull Project project, @NotNull VirtualFile file) {
        return new DrawioFileEditor(project, file);
    }

    @Override
    public @NotNull String getEditorTypeId() {
        return "modux-drawio-editor";
    }

    @Override
    public @NotNull FileEditorPolicy getPolicy() {
        // Beside the modux canvas, still before the raw YAML: a view is a canvas, draw.io is another
        // way to draw it.
        return FileEditorPolicy.PLACE_BEFORE_DEFAULT_EDITOR;
    }
}
