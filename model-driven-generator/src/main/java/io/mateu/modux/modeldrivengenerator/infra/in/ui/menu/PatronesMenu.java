package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapDiagramPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowExpandedPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Patrones")
public class PatronesMenu {

    @Menu
    ContextMapDiagramPage contextMap;

    @Menu
    FlowCrudOrchestrator flows;

    @Menu
    FlowExpandedPage flowsExpanded;

    @Menu
    ReadModelCrudOrchestrator readModels;

}
