package io.mateu.modux.specdrivengenerator.infra.in.ui.menu;

import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.component.ComponentCrudOrchestrator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.gateway.GatewayCrudOrchestrator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page.PageCrudOrchestrator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uiadapter.UiAdapterCrudOrchestrator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uishell.UiShellCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Interfaces")
public class InterfacesMenu {

    @Menu
    GatewayCrudOrchestrator gateways;

    @Menu
    ReadModelCrudOrchestrator readModels;

    @Menu
    PageCrudOrchestrator pages;

    @Menu
    ComponentCrudOrchestrator components;

    @Menu
    UiAdapterCrudOrchestrator uiAdapters;

    @Menu
    UiShellCrudOrchestrator uiShells;

}
