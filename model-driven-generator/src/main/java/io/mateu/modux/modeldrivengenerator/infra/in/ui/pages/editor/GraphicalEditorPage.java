package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.editor;

import io.mateu.uidl.annotations.Title;
import io.mateu.uidl.data.Element;
import io.mateu.uidl.fluent.Component;
import io.mateu.uidl.fluent.PageView;
import io.mateu.uidl.interfaces.ActionHandler;
import io.mateu.uidl.interfaces.ComponentTreeSupplier;
import io.mateu.uidl.interfaces.HttpRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.util.List;
import java.util.Map;

/**
 * Embeds the graphical model editor (editor/ package) as a web component. The
 * {@code import} attribute makes Mateu's element renderer dynamically load the
 * bundle that defines the tag; the component then talks to
 * {@code /modux/editor} (EditorApiController) on the same origin — model in,
 * commands and layout out.
 *
 * <p>Double click on the canvas raises {@code modux-activate}, wired through the
 * element's event map to {@link #handleAction} — which navigates to the
 * element's CRUD page (routes derive from the @Menu tree).
 */
@Service
@Scope("prototype")
@Title("Editor gráfico")
public class GraphicalEditorPage implements ComponentTreeSupplier, ActionHandler {

    /** elementType (as emitted by the editor views) → CRUD listing route. */
    private static final Map<String, String> CRUD_ROUTES = Map.of(
            "module", "/organizacion/modules",
            "aggregate", "/domainModel/aggregates",
            "entity", "/domainModel/entities",
            "flow", "/patrones/flows",
            "process", "/patrones/processes");

    /**
     * Cache-busting fingerprint of the editor bundle. A rebuilt bundle gets a new URL, so
     * neither the browser's HTTP cache nor the tab's ES-module map can keep serving stale
     * editor code (dynamic imports are cached per-URL for the life of the page).
     */
    private static volatile String bundleVersion;

    private static String bundleVersion() {
        if (bundleVersion == null) {
            try (var in = GraphicalEditorPage.class
                    .getResourceAsStream("/static/modux-editor/modux-editor.js")) {
                var crc = new java.util.zip.CRC32();
                var buffer = new byte[8192];
                for (int n; in != null && (n = in.read(buffer)) > 0; ) crc.update(buffer, 0, n);
                bundleVersion = Long.toHexString(crc.getValue());
            } catch (Exception e) {
                bundleVersion = "0";
            }
        }
        return bundleVersion;
    }

    @Override
    public Component component(HttpRequest httpRequest) {
        var editor = new Element(
                "modux-editor-connected",
                Map.of(
                        "import", "/modux-editor/modux-editor.js?v=" + bundleVersion(),
                        "base", "/modux/editor",
                        "style", "display: block; height: calc(100vh - 220px); min-height: 480px;"),
                Map.of("modux-activate", "openElement"),
                null,
                null,
                null);
        return PageView.builder()
                .title("Editor gráfico")
                .subtitle("Context map, agregados, flows y procesos sobre lienzo editable — los cambios se guardan en el modelo.")
                .content(List.of(editor))
                .build();
    }

    @Override
    public List<String> supportedActions() {
        return List.of("openElement");
    }

    @Override
    public Object handleAction(String actionId, HttpRequest httpRequest) {
        if (!"openElement".equals(actionId)) return null;
        var event = (Map<String, Object>) httpRequest.runActionRq().parameters().get("event");
        if (event == null) return null;
        var route = CRUD_ROUTES.get((String) event.get("elementType"));
        var id = (String) event.get("id");
        if (route == null || id == null) return null;
        return URI.create(route + "/" + id);
    }
}
