package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.uidl.annotations.PlainText;

/**
 * Shown in the detail pane when nothing is selected yet, or when a non-openable node (a group folder or
 * an info leaf) is selected.
 */
public record WorkspacePlaceholder(@PlainText String mensaje) {

  public WorkspacePlaceholder() {
    this("Selecciona un elemento del árbol para verlo o editarlo.");
  }
}
