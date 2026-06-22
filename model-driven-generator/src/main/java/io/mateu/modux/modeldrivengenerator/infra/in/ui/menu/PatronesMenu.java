package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Patrones")
public class PatronesMenu {

    @Menu
    ReadModelCrudOrchestrator readModels;

}
