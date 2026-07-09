package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.menu.*;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.editor.GraphicalEditorPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelhealth.ModelHealthPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.ModelContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.ProjectContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.RepositoryContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.RepositoryCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch.SpecSearchCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace.WorkspaceCrudOrchestrator;
import io.mateu.uidl.annotations.AppContext;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;

@UI("")
@Title("Modux")
public class ModelDrivenGeneratorHome {

    /** Modux works on ONE repository + ONE project at a time — both are app-level context. */
    @AppContext(label = "Repositorio")
    RepositoryContextSelector repository;

    @AppContext(label = "Proyecto")
    ProjectContextSelector project;

    /** The working model: the system (as-is) or one of its solutions (to-be). */
    @AppContext(label = "Modelo")
    ModelContextSelector model;

    @Menu
    WorkspaceCrudOrchestrator workspace;

    @Menu
    RepositoryCrudOrchestrator repositories;

    @Menu
    SpecSearchCrudOrchestrator search;

    @Menu
    GraphicalEditorPage graphicalEditor;

    @Menu
    ModelHealthPage modelHealth;

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
