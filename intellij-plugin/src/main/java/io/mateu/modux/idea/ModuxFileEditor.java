package io.mateu.modux.idea;

import com.intellij.openapi.fileEditor.FileEditor;
import com.intellij.openapi.fileEditor.FileEditorState;
import com.intellij.openapi.fileEditor.FileEditorStateLevel;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Disposer;
import com.intellij.openapi.util.Key;
import com.intellij.openapi.util.UserDataHolderBase;
import com.intellij.openapi.vfs.VirtualFile;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.JComponent;
import java.beans.PropertyChangeListener;

/**
 * The graphical model editor, opened on a model's {@code index.yaml}.
 *
 * <p>It is a normal file editor, so the model opens the way any other file does: from the
 * project tree, from Search Everywhere, in a split. There is no separate window and no server
 * to start first.
 */
public final class ModuxFileEditor extends UserDataHolderBase implements FileEditor {

    private final VirtualFile file;
    private final VirtualFile modelRoot;
    private final EditorBridge bridge;

    public ModuxFileEditor(Project project, VirtualFile file) {
        this.file = file;                                 // the view document
        this.modelRoot = ModuxProject.catalogRootFor(file);   // its catalog (.modux/), may be null
        this.bridge = new EditorBridge(project, modelRoot, file);
        Disposer.register(this, bridge);
    }

    @Override
    public @NotNull JComponent getComponent() {
        return bridge.component();
    }

    @Override
    public @Nullable JComponent getPreferredFocusedComponent() {
        return bridge.component();
    }

    @Override
    public @NotNull String getName() {
        return "Modux";
    }

    @Override
    public @NotNull VirtualFile getFile() {
        return file;
    }

    /** The model root this editor is bound to — the directory holding the marker. */
    public VirtualFile modelRoot() {
        return modelRoot;
    }

    @Override
    public void setState(@NotNull FileEditorState state) {
        // the editor keeps its own view state in the model's diagrams
    }

    @Override
    public @NotNull FileEditorState getState(@NotNull FileEditorStateLevel level) {
        return FileEditorState.INSTANCE;
    }

    @Override
    public boolean isModified() {
        // edits are flushed to files as they happen; nothing is held unsaved in the editor
        return false;
    }

    @Override
    public boolean isValid() {
        return file.isValid();
    }

    @Override
    public void addPropertyChangeListener(@NotNull PropertyChangeListener listener) {}

    @Override
    public void removePropertyChangeListener(@NotNull PropertyChangeListener listener) {}

    @Override
    public <T> @Nullable T getUserData(@NotNull Key<T> key) {
        return super.getUserData(key);
    }

    @Override
    public void dispose() {
        // the bridge is registered as a child
    }
}
