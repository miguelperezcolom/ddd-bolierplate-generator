package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.menu.*;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace.WorkspaceCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;

@UI("")
@Title("Modux")
public class ModelDrivenGeneratorHome {

    @Menu
    WorkspaceCrudOrchestrator workspace;

    @Menu
    OrganizacionMenu organizacion;

    @Menu
    DomainModelMenu domainModel;

    @Menu
    BehaviourMenu behaviour;

    @Menu
    TransversalMenu transversal;

    @Menu
    PatronesMenu patrones;

    @Menu
    InboundMenu inbound;

    @Menu
    OutboundMenu outbound;

    @Menu
    SecurityMenu security;

}
