package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelhealth.CleanModelPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelhealth.ModelHealthPage;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

/** Cross-cutting utilities over the model — diagnostics and hygiene, not authoring. */
@Title("Tools")
public class ToolsMenu {

    @Menu
    ModelHealthPage modelHealth;

    @Menu
    CleanModelPage limpiarModelo;
}
