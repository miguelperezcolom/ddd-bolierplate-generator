package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.inicio;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.open.OpenRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.ModuxHomeStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.home.RepositoryStoreOpener;
import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Button;
import io.mateu.uidl.data.ButtonStyle;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.data.Text;
import io.mateu.uidl.data.VerticalLayout;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.interfaces.ActionHandler;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

/**
 * The front door when nothing is open yet: modux works on ONE repository +
 * ONE project at a time, and the editor, the search and the CRUDs all need
 * them — so the FIRST thing the app asks is which one (or to create it).
 * Opening a repository also settles the project: the current one, the first
 * one, or a fresh default (project + service) when the store is empty.
 */
@Service
@Scope("prototype")
@Title("Inicio")
@RequiredArgsConstructor
public class InicioPage implements ComponentTreeSupplier, ActionHandler {

    private final ModuxHomeStore home;
    private final RepositoryStoreOpener projectStore;
    private final OpenRepositoryUseCase openUseCase;
    private final ModelStore repository;

    @Override
    public Component component(HttpRequest httpRequest) {
        var repos = home.loadRepositories();
        var currentRepo = projectStore.currentRepositoryId().orElse(null);
        var content = new ArrayList<Component>();

        if (repos.isEmpty()) {
            content.add(new Text(null,
                    "Modux trabaja sobre un repositorio (una carpeta local, un git o una base de datos) "
                            + "que guarda el modelo. Todavía no hay ninguno en ~/.modux: crea el primero "
                            + "para empezar a modelar."));
            content.add(Button.builder()
                    .label("Crear el primer repositorio…")
                    .actionId("nuevo")
                    .buttonStyle(ButtonStyle.primary)
                    .build());
        } else {
            content.add(new Text(null,
                    "Elige el repositorio sobre el que trabajar — al abrirlo se selecciona también "
                            + "su proyecto (o se crea uno si el modelo está vacío) y entras al editor."));
            for (var r : repos) {
                var isCurrent = r.id().equals(currentRepo);
                content.add(Button.builder()
                        .label((isCurrent ? "● " : "") + (r.name() != null ? r.name() : r.id())
                                + (r.type() != null ? "  ·  " + r.type() : ""))
                        .actionId("open:" + r.id())
                        .buttonStyle(isCurrent ? ButtonStyle.primary : ButtonStyle.tertiary)
                        .build());
            }
            content.add(Button.builder()
                    .label("＋ Nuevo repositorio…")
                    .actionId("nuevo")
                    .buttonStyle(ButtonStyle.tertiary)
                    .build());
        }

        return PageView.builder()
                .title("Modux")
                .subtitle("Repositorio → proyecto → modelo: el contexto de trabajo, primero")
                .content(List.of(VerticalLayout.builder()
                        .content(content)
                        .spacing(true)
                        .build()))
                .build();
    }

    @Override
    public List<String> supportedActions() {
        var actions = new ArrayList<String>(List.of("nuevo"));
        home.loadRepositories().forEach(r -> actions.add("open:" + r.id()));
        return actions;
    }

    @Override
    public Object handleAction(String actionId, HttpRequest httpRequest) {
        if ("nuevo".equals(actionId)) {
            return URI.create("/repositories/new");
        }
        if (actionId != null && actionId.startsWith("open:")) {
            var repoId = actionId.substring("open:".length());
            openUseCase.handle(repoId);
            home.saveCurrentRepositoryId(repoId);
            ensureProject();
            return URI.create("/graphicalEditor");
        }
        return null;
    }

    /** The project settles with the repository: current, first, or a fresh default. */
    private void ensureProject() {
        var projects = repository.findAllOfType(ProjectEntity.class);
        var current = projectStore.currentProjectId().orElse(null);
        if (current != null && projects.stream().anyMatch(p -> p.id().equals(current))) return;
        if (!projects.isEmpty()) {
            projectStore.selectProject(projects.getFirst().id());
            return;
        }
        // An empty store: the topology exists from minute one (like the editor's
        // blank-canvas bootstrap and the MCP's bootstrap_project).
        repository.save(ServiceEntity.builder().id("svc-principal").name("Servicio principal").build());
        repository.save(ProjectEntity.builder()
                .id("project").name("Proyecto")
                .serviceIds(List.of("svc-principal"))
                .build());
        projectStore.selectProject("project");
    }
}
