package io.mateu.mdd.specdrivengenerator.infra.in.ui;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.AsyncMenu;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.BehaviourMenu;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.DomainModelMenu;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.InterfacesMenu;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.OrganizacionMenu;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.menu.SecurityMenu;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;

@UI("")
@Title("Spec-driven code generator")
public class SpecDrivenGeneratorHome {

    @Menu
    OrganizacionMenu organizacion;

    @Menu
    DomainModelMenu domainModel;

    @Menu
    BehaviourMenu behaviour;

    @Menu
    AsyncMenu async;

    @Menu
    InterfacesMenu interfaces;

    @Menu
    SecurityMenu security;

}
