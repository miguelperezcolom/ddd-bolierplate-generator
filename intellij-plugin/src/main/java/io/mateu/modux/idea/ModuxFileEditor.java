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

import com.intellij.openapi.application.ApplicationManager;

import javax.swing.JComponent;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

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
    private final List<PropertyChangeListener> listeners = new CopyOnWriteArrayList<>();
    private volatile boolean modified;

    public ModuxFileEditor(Project project, VirtualFile file) {
        this.file = file;                                 // the view document
        this.modelRoot = ModuxProject.catalogRootFor(file);   // its catalog (.modux/), may be null
        this.bridge = new EditorBridge(project, modelRoot, file);
        this.bridge.onModified(this::setModified);        // the webview drives the dirty state
        Disposer.register(this, bridge);
    }

    /** The webview says its buffer is (un)saved: reflect it so the tab marks modified and Ctrl+S/close prompt. */
    private void setModified(boolean value) {
        if (value == modified) return;
        boolean old = modified;
        modified = value;
        ApplicationManager.getApplication().invokeLater(() -> {
            var event = new PropertyChangeEvent(this, "modified", old, value);
            for (var listener : listeners) listener.propertyChange(event);
        });
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
        // the webview buffers edits until an explicit save; this drives the modified indicator,
        // Ctrl+S (Save All), and the "save changes?" prompt on close
        return modified;
    }

    @Override
    public boolean isValid() {
        return file.isValid();
    }

    @Override
    public void addPropertyChangeListener(@NotNull PropertyChangeListener listener) {
        listeners.add(listener);
    }

    @Override
    public void removePropertyChangeListener(@NotNull PropertyChangeListener listener) {
        listeners.remove(listener);
    }

    @Override
    public <T> @Nullable T getUserData(@NotNull Key<T> key) {
        return super.getUserData(key);
    }

    @Override
    public void dispose() {
        // the bridge is registered as a child
    }
}
