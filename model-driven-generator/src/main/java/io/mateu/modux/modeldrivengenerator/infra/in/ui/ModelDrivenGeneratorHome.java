package io.mateu.modux.modeldrivengenerator.infra.in.ui;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.menu.*;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.editor.GraphicalEditorPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.ModelContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.ProjectContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.RepositoryContextSelector;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository.RepositoryCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.specsearch.SpecSearchCrudOrchestrator;
import io.mateu.uidl.annotations.App;
import io.mateu.uidl.annotations.AppContext;
import io.mateu.uidl.annotations.AI;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.annotations.UI;
import io.mateu.uidl.fluent.AppVariant;

@UI("")
@Title("Modux")
// El chat de la app habla con el pseudoagente local (CLI del desarrollador, sin api key).
@AI(sse = "/mateu/agent/stream", mcp = "/mcp")
// The nested «Modelo» menu made the menu DEEP, and the AUTO variant renders deep
// menus as a tiles hub; the classic top bar shows them as cascading dropdowns.
@App(AppVariant.MENU_ON_TOP)
public class ModelDrivenGeneratorHome implements io.mateu.uidl.interfaces.HomeRouteSupplier {

    /**
     * The landing depends on the working context: with a repository open you
     * land on the graphical editor; without one (or with an empty catalog) the
     * FIRST thing is choosing — or creating — where to work. Mateu instantiates
     * this shell by reflection, so the beans arrive through the static bridge.
     */
    @Override
    public String homeRoute() {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var homeStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.ModuxHomeStore.class);
        var hasCurrent = projectStore.currentRepositoryId().isPresent();
        return hasCurrent && !homeStore.loadRepositories().isEmpty() ? "/graphicalEditor" : "/inicio";
    }

    /** Modux works on ONE repository + ONE project at a time — both are app-level context. */
    @AppContext(label = "Repositorio")
    RepositoryContextSelector repository;

    @AppContext(label = "Proyecto")
    ProjectContextSelector project;

    /** The working model: the system (as-is) or one of its solutions (to-be). */
    @AppContext(label = "Modelo")
    ModelContextSelector model;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.inicio.InicioPage inicio;

    @Menu
    RepositoryCrudOrchestrator repositories;

    @Menu
    SpecSearchCrudOrchestrator search;

    @Menu
    GraphicalEditorPage graphicalEditor;

    @Menu
    ModelMenu modelo;

    @Menu
    ToolsMenu tools;

}
