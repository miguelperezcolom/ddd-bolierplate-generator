package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch;

import io.mateu.uidl.annotations.PlainText;
import io.mateu.uidl.annotations.Title;

/**
 * Shown in the detail pane before any result is selected. Also what the (read-only) crud renders
 * when the framework resolves the {@code /new} route it builds for every split view.
 */
@Title("Search the specification")
public record SpecSearchPlaceholder(@PlainText String mensaje) {

  public SpecSearchPlaceholder() {
    this("Busca en toda la especificación y selecciona un resultado para verlo.");
  }
}
