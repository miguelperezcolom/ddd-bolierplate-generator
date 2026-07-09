package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The UI map through the editor API: apps (UiAdapter + menu tree), pages (buttons,
 * listing, viewmodel) and the actor→app link — authored with the editor commands and
 * read back from the /model snapshot, then torn down leaving the model clean.
 */
@SpringBootTest
class UiEditorCommandsTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    EditorApiController controller;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void the_ui_map_is_authored_with_commands_and_projected_into_the_snapshot() throws Exception {
        // an EMPTY store: the UI map is authored from nothing
        var dir = Files.createTempDirectory("ui-editor-commands");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());

        // ── the surrounding model: a module with a use case and a query service, an actor ──
        apply("""
                {"kind":"add-module","id":"test-mod","name":"Reservas"}""");
        apply("""
                {"kind":"add-use-case","id":"test-uc","name":"Reservar","moduleId":"test-mod"}""");
        apply("""
                {"kind":"add-query-service","id":"test-qs","name":"ReservasDelDia","moduleId":"test-mod"}""");
        apply("""
                {"kind":"add-actor","id":"test-actor","name":"Recepción"}""");
        repository.save(new ModelEntity("test-model", "ReservaForm", List.of(), List.of()));

        // ── the UI map: app → page (born on the menu) → button, listing, viewmodel, actor ──
        apply("""
                {"kind":"create-ui-app","id":"test-app","name":"Recepción App"}""");
        apply("""
                {"kind":"create-ui-page","id":"test-page","name":"Reservas","pageType":"CRUD",
                 "appId":"test-app","menuLabel":"Reservas del día"}""");
        apply("""
                {"kind":"add-page-button","pageId":"test-page","useCaseId":"test-uc"}""");
        apply("""
                {"kind":"set-page-listing","pageId":"test-page","queryServiceId":"test-qs"}""");
        apply("""
                {"kind":"set-page-model","pageId":"test-page","modelId":"test-model"}""");
        apply("""
                {"kind":"add-actor-app","actorId":"test-actor","appId":"test-app"}""");
        // a submenu: a root section and a child entry under it (recursive insertion)
        apply("""
                {"kind":"add-menu-item","appId":"test-app","label":"Administración"}""");
        apply("""
                {"kind":"add-menu-item","appId":"test-app","label":"Configuración",
                 "parentLabel":"Administración","pageId":"test-page"}""");

        // ── the snapshot reflects the whole map ──────────────────────────────
        var model = controller.model();

        var app = model.uiApps().stream().filter(a -> "test-app".equals(a.id())).findFirst().orElseThrow();
        assertThat(app.name()).isEqualTo("Recepción App");
        assertThat(app.title()).isEqualTo("Recepción App");
        assertThat(app.menuItems()).hasSize(2);
        assertThat(app.menuItems().get(0).label()).isEqualTo("Reservas del día");
        assertThat(app.menuItems().get(0).pageId()).isEqualTo("test-page");
        var section = app.menuItems().get(1);
        assertThat(section.label()).isEqualTo("Administración");
        assertThat(section.children()).hasSize(1);
        assertThat(section.children().get(0).label()).isEqualTo("Configuración");
        assertThat(section.children().get(0).pageId()).isEqualTo("test-page");

        var page = model.pages().stream().filter(p -> "test-page".equals(p.id())).findFirst().orElseThrow();
        assertThat(page.name()).isEqualTo("Reservas");
        assertThat(page.type()).isEqualTo("CRUD");
        assertThat(page.route()).isEqualTo("/test-page");
        assertThat(page.listingQueryServiceId()).isEqualTo("test-qs");
        assertThat(page.modelId()).isEqualTo("test-model");
        assertThat(page.modelName()).isEqualTo("ReservaForm");
        assertThat(page.buttons()).hasSize(1);
        assertThat(page.buttons().get(0).useCaseId()).isEqualTo("test-uc");
        assertThat(page.buttons().get(0).label()).isEqualTo("Reservar"); // defaults to the use case name

        assertThat(model.actorAppUses())
                .contains(new EditorApiController.ActorAppUseDto("test-actor", "test-app"));

        // ── each command has its inverse; undoing everything leaves the model clean ──
        apply("""
                {"kind":"remove-menu-item","appId":"test-app","label":"Configuración"}""");
        apply("""
                {"kind":"remove-page-button","pageId":"test-page","useCaseId":"test-uc"}""");
        apply("""
                {"kind":"set-page-listing","pageId":"test-page"}""");
        apply("""
                {"kind":"set-page-model","pageId":"test-page"}""");
        apply("""
                {"kind":"remove-actor-app","actorId":"test-actor","appId":"test-app"}""");

        model = controller.model();
        page = model.pages().stream().filter(p -> "test-page".equals(p.id())).findFirst().orElseThrow();
        assertThat(page.buttons()).isEmpty();
        assertThat(page.listingQueryServiceId()).isNull();
        assertThat(page.modelId()).isNull();
        assertThat(model.actorAppUses())
                .doesNotContain(new EditorApiController.ActorAppUseDto("test-actor", "test-app"));
        app = model.uiApps().stream().filter(a -> "test-app".equals(a.id())).findFirst().orElseThrow();
        assertThat(app.menuItems().get(1).children()).isEmpty();

        // deleting the page also drops every menu entry pointing at it, at any depth
        apply("""
                {"kind":"add-menu-item","appId":"test-app","label":"Otra entrada",
                 "parentLabel":"Administración","pageId":"test-page"}""");
        apply("""
                {"kind":"delete-ui-page","id":"test-page"}""");

        model = controller.model();
        app = model.uiApps().stream().filter(a -> "test-app".equals(a.id())).findFirst().orElseThrow();
        assertThat(app.menuItems()).hasSize(1); // the root entry pointing at the page is gone
        assertThat(app.menuItems().get(0).label()).isEqualTo("Administración");
        assertThat(app.menuItems().get(0).children()).isEmpty(); // and so is the nested one

        apply("""
                {"kind":"delete-ui-app","id":"test-app"}""");

        model = controller.model();
        assertThat(model.pages()).noneMatch(p -> "test-page".equals(p.id()));
        assertThat(model.uiApps()).noneMatch(a -> "test-app".equals(a.id()));
        assertThat(model.actorAppUses()).noneMatch(u -> "test-app".equals(u.appId()));
    }

    private void apply(String commandJson) throws Exception {
        controller.apply(mapper.readValue(commandJson, EditorApiController.EditorCommand.class));
    }
}
