package io.mateu.mdd.specdrivengenerator.infra.in.ui.menu;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway.GatewayCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Interfaces")
public class InterfacesMenu {

    @Menu
    GatewayCrudOrchestrator gateways;

    @Menu
    ReadModelCrudOrchestrator readModels;

}
