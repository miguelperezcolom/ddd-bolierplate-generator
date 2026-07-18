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
public class ModelDrivenGeneratorHome
        implements io.mateu.uidl.interfaces.HomeRouteSupplier, io.mateu.uidl.interfaces.MenuSupplier,
        io.mateu.uidl.interfaces.AppActionsSupplier {

    /**
     * Generate, next to the repo-project-model selectors — only when the whole
     * app context is resolved (the model selector always holds a value: as-is
     * or a solution, so repository + project decide).
     */
    @Override
    public java.util.List<io.mateu.uidl.data.AppHeaderAction> appActions(
            io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        if (projectStore.currentRepositoryId().isEmpty() || projectStore.currentProjectId().isEmpty()) {
            return java.util.List.of();
        }
        var actions = new java.util.ArrayList<io.mateu.uidl.data.AppHeaderAction>();
        actions.add(new io.mateu.uidl.data.AppHeaderAction("generateCurrentProject", "Generar", "vaadin:cogs"));
        // One header button for the whole delivery pipeline: a dropdown keeps the
        // header usable as actions accumulate (deploy, terraform, try it…).
        var deploy = new java.util.ArrayList<io.mateu.uidl.data.AppHeaderAction>();
        deploy.add(new io.mateu.uidl.data.AppHeaderAction("deployCurrentProject", "Desplegar en Kubernetes", "vaadin:rocket"));
        deploy.add(new io.mateu.uidl.data.AppHeaderAction("applyTerraformCurrentProject", "Aplicar Terraform", "vaadin:cloud-upload-o"));
        actions.add(io.mateu.uidl.data.AppHeaderAction.menu("Desplegar", "vaadin:rocket", deploy));
        // Probar closes the natural sequence (Generar → Desplegar → Probar), so it
        // rides AFTER the deploy menu. Always visible: without a declared URL the
        // button used to vanish silently (and read as "lost"); now the click raises
        // the message that explains how to declare one (vista Distribución).
        actions.add(new io.mateu.uidl.data.AppHeaderAction("openCurrentProjectUrl", "Probar", "vaadin:play"));
        return actions;
    }

    /** The header's Probar: opens the project's declared URL in a new tab (a UI command). */
    public Object openCurrentProjectUrl(io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var url = projectStore.currentProjectId()
                .flatMap(projectId -> SpringBeans.get(
                        io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy.DeployProjectUseCase.class)
                        .declaredUrl(projectId))
                .orElseThrow(() -> new IllegalStateException(
                        "El proyecto no declara ninguna URL: añade una en la vista Distribución y conéctala al servicio"));
        return io.mateu.uidl.data.UICommand.navigateTo(url);
    }

    /** The header's Aplicar Terraform: init + apply of the generated terraform/ folder. */
    public Object applyTerraformCurrentProject(io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var projectId = projectStore.currentProjectId().orElseThrow(
                () -> new IllegalStateException("No hay proyecto seleccionado"));
        return SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy.ApplyTerraformUseCase.class)
                .handle(projectId);
    }

    /** The header's Deploy: generated services → images → the environment's cluster. */
    public Object deployCurrentProject(io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var projectId = projectStore.currentProjectId().orElseThrow(
                () -> new IllegalStateException("No hay proyecto seleccionado"));
        // A STREAM of milestones: served over mateu's SSE action channel, each one
        // reaches the user as a toast while the pipeline advances.
        return SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy.DeployProjectUseCase.class)
                .handle(new io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy.DeployProjectCommand(
                        projectId, null));
    }

    /** The header's Generate: the CURRENT project, to its declared outputPath. */
    public Object generateCurrentProject(io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var repository = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository.class);
        var projectId = projectStore.currentProjectId().orElseThrow(
                () -> new IllegalStateException("No hay proyecto seleccionado"));
        var project = repository.findById(projectId,
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity.class)
                .orElseThrow(() -> new IllegalStateException("Proyecto desconocido: " + projectId));
        SpringBeans.get(io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase.class)
                .handle(new io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand(
                        projectId, null, null, false));
        return io.mateu.uidl.data.Message.success("Código generado en " + project.outputPath());
    }

    /**
     * Without a repository there is NOTHING to navigate: the whole menu folds
     * down to «Inicio» until one is created/opened. With one, the menu is the
     * SAME declared @Menu tree, derived reflectively (labels from @Title, paths
     * from the field-name chain) — one source of truth, projected per state.
     */
    @Override
    public java.util.List<io.mateu.uidl.interfaces.Actionable> menu(
            io.mateu.uidl.interfaces.HttpRequest httpRequest) {
        var projectStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener.class);
        var homeStore = SpringBeans.get(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.ModuxHomeStore.class);
        var ready = projectStore.currentRepositoryId().isPresent()
                && !homeStore.loadRepositories().isEmpty();
        if (!ready) {
            // Route resolution follows the menu: the folded state keeps ONLY what
            // works without a repository — Inicio, and the catalog it needs to
            // create/manage one. Everything else waits.
            return java.util.List.of(
                    new io.mateu.uidl.data.FieldLink("Inicio", ModelDrivenGeneratorHome.class, "inicio")
                            .withPath("/inicio"),
                    new io.mateu.uidl.data.FieldLink("Repositorios", ModelDrivenGeneratorHome.class, "repositories")
                            .withPath("/repositories"));
        }
        return menuTree(ModelDrivenGeneratorHome.class);
    }

    /** The declared @Menu tree as public Actionables: FieldLinks and nested Menus. */
    private static java.util.List<io.mateu.uidl.interfaces.Actionable> menuTree(Class<?> owner) {
        var out = new java.util.ArrayList<io.mateu.uidl.interfaces.Actionable>();
        for (var field : owner.getDeclaredFields()) {
            if (!field.isAnnotationPresent(io.mateu.uidl.annotations.Menu.class)) continue;
            // Paths are SEGMENT-relative: the resolver matches token by token,
            // accumulating the prefix as it descends the tree.
            var path = "/" + field.getName();
            var label = titleOf(field.getType(), field.getName());
            var nested = java.util.Arrays.stream(field.getType().getDeclaredFields())
                    .anyMatch(f -> f.isAnnotationPresent(io.mateu.uidl.annotations.Menu.class));
            if (nested) {
                out.add(new io.mateu.uidl.data.Menu(path, label, menuTree(field.getType())));
            } else {
                out.add(new io.mateu.uidl.data.FieldLink(label, owner, field.getName()).withPath(path));
            }
        }
        return out;
    }

    private static String titleOf(Class<?> type, String fieldName) {
        var title = type.getAnnotation(io.mateu.uidl.annotations.Title.class);
        if (title != null) return title.value();
        var human = fieldName.replaceAll("([a-z])([A-Z])", "$1 $2").toLowerCase();
        return Character.toUpperCase(human.charAt(0)) + human.substring(1);
    }

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
