package io.mateu.mdd.specdrivengenerator.infra.in.ui.menu;

import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.module.ModuleCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.project.ProjectCrudOrchestrator;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.service.ServiceCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Organización")
public class OrganizacionMenu {

    @Menu
    ProjectCrudOrchestrator projects;

    @Menu
    ServiceCrudOrchestrator services;

    @Menu
    ModuleCrudOrchestrator modules;

}
