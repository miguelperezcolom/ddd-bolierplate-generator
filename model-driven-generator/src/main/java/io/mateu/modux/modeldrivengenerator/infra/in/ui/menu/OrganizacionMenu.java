package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.decision.DecisionCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.designdoc.DesignDocPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.boundedcontext.BoundedContextCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project.ImportApiContractForm;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project.ProjectCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.service.ServiceCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Organización")
public class OrganizacionMenu {

    @Menu
    ProjectCrudOrchestrator projects;

    @Menu
    ServiceCrudOrchestrator services;

    @Menu
    BoundedContextCrudOrchestrator boundedContexts;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.externalsystem.ExternalSystemCrudOrchestrator externalSystems;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module.ModuleCrudOrchestrator modules;

    @Menu
    DecisionCrudOrchestrator decisions;

    @Menu
    DesignDocPage designDocument;

    @Menu
    ImportApiContractForm importApiContract;

}
