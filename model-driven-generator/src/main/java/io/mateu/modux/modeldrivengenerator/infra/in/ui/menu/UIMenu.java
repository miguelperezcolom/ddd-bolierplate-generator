package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.component.ComponentCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway.GatewayCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page.DeriveUseCasesForm;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page.PageCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uiadapter.UiAdapterCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uishell.UiShellCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("UI")
public class UIMenu {

    @Menu
    PageCrudOrchestrator pages;

    @Menu
    DeriveUseCasesForm deriveUseCases;

    @Menu
    ComponentCrudOrchestrator components;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup.ButtonGroupCrudOrchestrator buttonGroups;

    @Menu
    UiAdapterCrudOrchestrator uiAdapters;

    @Menu
    UiShellCrudOrchestrator uiShells;

}
