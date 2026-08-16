package io.mateu.modux.idea;

import com.intellij.openapi.Disposable;
import com.intellij.ui.jcef.utils.JBCefStreamResourceHandler;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.handler.CefRequestHandlerAdapter;
import org.cef.handler.CefResourceHandler;
import org.cef.handler.CefResourceRequestHandler;
import org.cef.handler.CefResourceRequestHandlerAdapter;
import org.cef.misc.BoolRef;
import org.cef.network.CefRequest;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Map;

/**
 * Serves the draw.io editor surface to its webview, all out of the plugin jar — nothing over the
 * network, so the draw.io that opens is the vendored, offline copy (§ self-host).
 *
 * <p>Three things live behind one origin: the host page ({@code /index.html}, built here), the draw.io
 * webapp ({@code /drawio/…}, the vendored static app), and the editor bundle's shared chunks
 * ({@code /drawio-host.js} and its imports, from {@code /modux-editor/…}). Serving them same-origin is
 * what lets the host page and the draw.io iframe talk over {@code postMessage}.
 */
final class DrawioResources extends CefRequestHandlerAdapter {

    /** The vendored draw.io webapp inside the jar. */
    private static final String DRAWIO = "/drawio";
    /** The editor bundle (shared with the modux canvas host): drawio-host.js and its chunks. */
    private static final String BUNDLE = "/modux-editor";

    static final String ORIGIN = "http://modux-drawio.localhost";
    static final String INDEX = ORIGIN + "/index.html";

    private final String page;
    private final Disposable parent;

    DrawioResources(String page, Disposable parent) {
        this.page = page;
        this.parent = parent;
    }

    @Override
    public CefResourceRequestHandler getResourceRequestHandler(
            CefBrowser browser, CefFrame frame, CefRequest request, boolean isNavigation,
            boolean isDownload, String requestInitiator, BoolRef disableDefaultHandling) {
        if (!request.getURL().startsWith(ORIGIN + "/")) return null;
        disableDefaultHandling.set(true);
        return new CefResourceRequestHandlerAdapter() {
            @Override
            public CefResourceHandler getResourceHandler(CefBrowser b, CefFrame f, CefRequest r) {
                return serve(r.getURL());
            }
        };
    }

    private CefResourceHandler serve(String url) {
        var resource = resolve(URI.create(url).getPath());
        return resource == null ? null
                : new JBCefStreamResourceHandler(resource.stream(), resource.mimeType(), parent, Map.of());
    }

    /** What is served for a path under the origin, or null when nothing is. */
    Resource resolve(String path) {
        if (path == null || path.contains("..")) return null;
        if (path.equals("/") || path.equals("/index.html")) {
            return new Resource(new ByteArrayInputStream(page.getBytes(StandardCharsets.UTF_8)), "text/html");
        }
        // The draw.io webapp answers under /drawio/…; everything else is the editor bundle (the
        // host script and its shared chunks), served from /modux-editor/… like the canvas host.
        var classpath = path.startsWith(DRAWIO + "/") ? path : BUNDLE + path;
        var stream = DrawioResources.class.getResourceAsStream(classpath);
        return stream == null ? null : new Resource(stream, mimeTypeOf(path));
    }

    record Resource(InputStream stream, String mimeType) {}

    private static String mimeTypeOf(String path) {
        if (path.endsWith(".js") || path.endsWith(".mjs")) return "text/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".json") || path.endsWith(".map")) return "application/json";
        if (path.endsWith(".svg")) return "image/svg+xml";
        if (path.endsWith(".gif")) return "image/gif";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
        if (path.endsWith(".ico")) return "image/x-icon";
        if (path.endsWith(".txt") || path.endsWith(".properties")) return "text/plain";
        if (path.endsWith(".woff2")) return "font/woff2";
        if (path.endsWith(".woff")) return "font/woff";
        if (path.endsWith(".ttf")) return "font/ttf";
        if (path.endsWith(".xml")) return "application/xml";
        return "application/octet-stream";
    }

    /** Whether both halves were packaged — a build mistake, not a run-time one. */
    static boolean isBundled() {
        return DrawioResources.class.getResource(BUNDLE + "/drawio-host.js") != null
                && DrawioResources.class.getResource(DRAWIO + "/js/app.min.js") != null;
    }
}
