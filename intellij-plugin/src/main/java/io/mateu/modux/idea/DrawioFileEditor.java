package io.mateu.modux.idea;

import com.intellij.openapi.application.ApplicationManager;
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
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * The draw.io editor for a view document — a second tab beside the modux canvas.
 *
 * <p>Same file, same model, different surface: this one edits the strategic tier (systems, contexts,
 * external systems, actors and their ArchiMate relations) in draw.io. Both editors write the same
 * {@code .modux} files, so switching tabs is switching lens, not model.
 */
public final class DrawioFileEditor extends UserDataHolderBase implements FileEditor {

    private final VirtualFile file;
    private final DrawioBridge bridge;
    private final List<PropertyChangeListener> listeners = new CopyOnWriteArrayList<>();
    private volatile boolean modified;

    public DrawioFileEditor(Project project, VirtualFile file) {
        this.file = file;
        var modelRoot = ModuxProject.catalogRootFor(file);
        this.bridge = new DrawioBridge(project, modelRoot, file);
        this.bridge.onModified(this::setModified);
        Disposer.register(this, bridge);
    }

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
        return "draw.io";
    }

    @Override
    public @NotNull VirtualFile getFile() {
        return file;
    }

    @Override
    public void setState(@NotNull FileEditorState state) {
    }

    @Override
    public @NotNull FileEditorState getState(@NotNull FileEditorStateLevel level) {
        return FileEditorState.INSTANCE;
    }

    @Override
    public boolean isModified() {
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
    public void deselectNotify() {
        bridge.saveIfDirty();
    }

    @Override
    public void dispose() {
    }
}
