package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

/**
 * ONE home for every element CRUD of the model: the top bar keeps the working
 * surfaces (workspace, editor, salud…) and everything that edits model elements
 * hangs from here, grouped as before.
 */
@Title("Modelo")
public class ModelMenu {

    @Menu
    OrganizacionMenu organizacion;

    @Menu
    DomainModelMenu domainModel;

    @Menu
    BehaviourMenu behaviour;

    @Menu
    PatronesMenu patrones;

    @Menu
    InboundMenu inbound;

    @Menu
    OutboundMenu outbound;

    @Menu
    SecurityMenu security;
}
