package io.mateu.modux.idea;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.intellij.openapi.Disposable;
import com.intellij.openapi.diagnostic.Logger;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.Disposer;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.ui.jcef.JBCefBrowser;
import com.intellij.ui.jcef.JBCefJSQuery;

import javax.swing.JComponent;
import java.util.ArrayList;

/**
 * Hosts the editor web component and answers its file requests.
 *
 * <p>The protocol is deliberately just the file system: list, read, write, delete, exists. The
 * model's mutation logic lives in TypeScript with the editor (see {@code editor/src/store/}), so
 * nothing here knows what an aggregate is — it moves bytes. That is the invariant the whole
 * design rests on: TypeScript writes the model, Java only reads it, to generate.
 */
public final class EditorBridge implements Disposable {

    private static final Logger LOG = Logger.getInstance(EditorBridge.class);
    private static final Gson GSON = new Gson();

    private final JBCefBrowser browser;
    private final JBCefJSQuery query;
    private final ModelFiles files;

    public EditorBridge(Project project, VirtualFile modelRoot) {
        this.files = new ModelFiles(project, modelRoot);
        this.browser = JBCefBrowser.createBuilder().setOffScreenRendering(false).build();
        this.query = JBCefJSQuery.create((com.intellij.ui.jcef.JBCefBrowserBase) browser);

        query.addHandler(this::handle);
        Disposer.register(this, browser);
        Disposer.register(this, query);
        browser.loadHTML(page());
    }

    public JComponent component() {
        return browser.getComponent();
    }

    /** Serve one request from the editor. Errors come back as data, never as a dead promise. */
    private JBCefJSQuery.Response handle(String raw) {
        try {
            var request = GSON.fromJson(raw, JsonObject.class);
            var op = request.get("op").getAsString();
            var result = switch (op) {
                case "list" -> GSON.toJsonTree(files.list(path(request)));
                case "read" -> GSON.toJsonTree(files.read(path(request)));
                case "exists" -> GSON.toJsonTree(files.exists(path(request)));
                case "flush" -> flush(request);
                default -> throw new IllegalArgumentException("unknown op: " + op);
            };
            var envelope = new JsonObject();
            envelope.add("ok", GSON.toJsonTree(true));
            envelope.add("value", result);
            return new JBCefJSQuery.Response(GSON.toJson(envelope));
        } catch (Exception e) {
            LOG.warn("modux bridge request failed", e);
            var envelope = new JsonObject();
            envelope.add("ok", GSON.toJsonTree(false));
            envelope.add("error", GSON.toJsonTree(String.valueOf(e.getMessage())));
            return new JBCefJSQuery.Response(GSON.toJson(envelope));
        }
    }

    /**
     * Apply a whole batch of writes and deletes at once. Batching is not an optimization here:
     * it is what makes one editor gesture one undo step in the IDE.
     */
    private com.google.gson.JsonElement flush(JsonObject request) throws java.io.IOException {
        var writes = new ArrayList<ModelFiles.FileWrite>();
        var deletes = new ArrayList<String>();
        for (var element : request.getAsJsonArray("writes")) {
            var write = element.getAsJsonObject();
            writes.add(new ModelFiles.FileWrite(
                    write.get("path").getAsString(), write.get("content").getAsString()));
        }
        for (var element : request.getAsJsonArray("deletes")) {
            deletes.add(element.getAsString());
        }
        files.write(writes, deletes);
        return GSON.toJsonTree(writes.size() + deletes.size());
    }

    private static String path(JsonObject request) {
        return request.get("path").getAsString();
    }

    /**
     * The page that hosts the editor. `moduxBridge` is the single entry point the TypeScript
     * host talks to; everything else about the editor is the same bundle the web app serves.
     */
    private String page() {
        return """
                <!doctype html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <style>
                      html, body { margin: 0; height: 100%%; overflow: hidden; }
                      #root { height: 100%%; }
                    </style>
                  </head>
                  <body>
                    <div id="root"><modux-editor-ide></modux-editor-ide></div>
                    <script>
                      window.moduxBridge = function (request) {
                        return new Promise(function (resolve, reject) {
                          %s
                        });
                      };
                    </script>
                    <script type="module" src="%s"></script>
                  </body>
                </html>
                """.formatted(
                query.inject("JSON.stringify(request)",
                        "function(r){ var p = JSON.parse(r); p.ok ? resolve(p.value) : reject(new Error(p.error)); }",
                        "function(code, message){ reject(new Error(message)); }"),
                bundleUrl());
    }

    /** Where the editor bundle is served from inside the plugin. */
    private static String bundleUrl() {
        var resource = EditorBridge.class.getResource("/modux-editor/modux-editor.js");
        return resource == null ? "" : resource.toExternalForm();
    }

    @Override
    public void dispose() {
        // children registered with Disposer go with us
    }
}
