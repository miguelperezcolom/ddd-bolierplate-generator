package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway.GatewayCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.integrationevent.IntegrationEventCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice.QueryServiceCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Outbound")
public class OutboundMenu {

    @Menu
    GatewayCrudOrchestrator gateways;

    @Menu
    QueryServiceCrudOrchestrator queryServices;

    @Menu
    IntegrationEventCrudOrchestrator integrationEvents;

}
