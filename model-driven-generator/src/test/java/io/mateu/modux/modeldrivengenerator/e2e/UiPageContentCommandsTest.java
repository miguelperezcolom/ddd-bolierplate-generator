package io.mateu.modux.modeldrivengenerator.e2e;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * The page's content tree (Mateu layouts with components inside) through the editor API:
 * authored with add/set/move/remove-page-component, read back from the /model snapshot.
 */
@SpringBootTest
class UiPageContentCommandsTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../sample/hla-booking/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    EditorApiController controller;

    @Autowired
    CommonFileRepository repository;

    final ObjectMapper mapper = new ObjectMapper();

    @Test
    void the_page_content_tree_is_authored_with_commands_and_projected_into_the_snapshot() throws Exception {
        // an EMPTY store: the content tree is authored from nothing
        var dir = Files.createTempDirectory("ui-page-content-commands");
        repository.loadFrom(dir.resolve("model-driven-store.yaml").toAbsolutePath().toString());

        // ── the surrounding model: a use case for the button to fire ─────────
        apply("""
                {"kind":"add-boundedContext","id":"test-mod","name":"Reservas"}""");
        apply("""
                {"kind":"add-use-case","id":"test-uc","name":"Reservar","boundedContextId":"test-mod"}""");
        apply("""
                {"kind":"create-ui-page","id":"test-page","name":"Reservas"}""");

        // ── a root layout with a button inside ───────────────────────────────
        apply("""
                {"kind":"add-page-component","pageId":"test-page",
                 "componentId":"comp-root","componentKind":"verticalLayout"}""");
        apply("""
                {"kind":"add-page-component","pageId":"test-page","componentId":"comp-btn",
                 "componentKind":"button","parentComponentId":"comp-root"}""");
        apply("""
                {"kind":"set-page-component","pageId":"test-page","componentId":"comp-btn",
                 "label":"Guardar","useCaseId":"test-uc"}""");

        // ── a tabLayout is born usable: seeded with two tabs ─────────────────
        apply("""
                {"kind":"add-page-component","pageId":"test-page",
                 "componentId":"comp-tabs","componentKind":"tabLayout"}""");

        var page = uiPage();
        assertThat(page.content()).hasSize(2);
        var tabs = page.content().get(1);
        assertThat(tabs.id()).isEqualTo("comp-tabs");
        assertThat(tabs.kind()).isEqualTo("tabLayout");
        assertThat(tabs.children()).extracting("id", "kind", "title").containsExactly(
                org.assertj.core.groups.Tuple.tuple("comp-tabs-tab-1", "tab", "Pestaña 1"),
                org.assertj.core.groups.Tuple.tuple("comp-tabs-tab-2", "tab", "Pestaña 2"));

        // ── the tab/tabLayout pairing and the kind catalog are enforced ──────
        assertThatThrownBy(() -> apply("""
                {"kind":"add-page-component","pageId":"test-page","componentId":"comp-bad",
                 "componentKind":"button","parentComponentId":"comp-tabs"}"""))
                .isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> apply("""
                {"kind":"add-page-component","pageId":"test-page","componentId":"comp-bad",
                 "componentKind":"tab"}"""))
                .isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> apply("""
                {"kind":"add-page-component","pageId":"test-page","componentId":"comp-bad",
                 "componentKind":"blinkLayout"}"""))
                .isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> apply("""
                {"kind":"set-page-component","pageId":"test-page","componentId":"comp-btn",
                 "useCaseId":"no-such-uc"}"""))
                .isInstanceOf(IllegalArgumentException.class);

        // ── the button moves — subtree extraction + insertion into a tab ─────
        apply("""
                {"kind":"move-page-component","pageId":"test-page","componentId":"comp-btn",
                 "parentComponentId":"comp-tabs-tab-1"}""");
        // …but never into its own subtree
        assertThatThrownBy(() -> apply("""
                {"kind":"move-page-component","pageId":"test-page","componentId":"comp-tabs",
                 "parentComponentId":"comp-tabs-tab-2"}"""))
                .isInstanceOf(IllegalArgumentException.class);

        // ── the snapshot reflects the whole tree ─────────────────────────────
        page = uiPage();
        assertThat(page.content()).extracting("id").containsExactly("comp-root", "comp-tabs");
        assertThat(page.content().get(0).children()).isEmpty(); // the button left the layout
        var firstTab = page.content().get(1).children().get(0);
        assertThat(firstTab.id()).isEqualTo("comp-tabs-tab-1");
        assertThat(firstTab.children()).hasSize(1);
        var button = firstTab.children().get(0);
        assertThat(button.id()).isEqualTo("comp-btn");
        assertThat(button.kind()).isEqualTo("button");
        assertThat(button.label()).isEqualTo("Guardar");
        assertThat(button.useCaseId()).isEqualTo("test-uc");

        // ── removing a layout prunes its whole subtree ───────────────────────
        apply("""
                {"kind":"remove-page-component","pageId":"test-page","componentId":"comp-tabs"}""");
        page = uiPage();
        assertThat(page.content()).extracting("id").containsExactly("comp-root");
        apply("""
                {"kind":"remove-page-component","pageId":"test-page","componentId":"comp-root"}""");
        assertThat(uiPage().content()).isEmpty();

        apply("""
                {"kind":"delete-ui-page","id":"test-page"}""");
    }

    @Test
    void pre_content_page_entities_load_with_an_empty_content_tree() {
        var page = new PageEntity("pg-legacy", "Legacy", "/legacy", "FORM",
                null, null, List.of(), null, null, List.of(), List.of(), List.of(), List.of(),
                List.of(), List.of(), List.of(), List.of(), null);
        assertThat(page.content()).isEmpty();
    }

    private EditorApiController.UiPageDto uiPage() {
        return controller.model().pages().stream()
                .filter(p -> "test-page".equals(p.id())).findFirst().orElseThrow();
    }

    private void apply(String commandJson) throws Exception {
        controller.apply(mapper.readValue(commandJson, EditorApiController.EditorCommand.class));
    }
}
