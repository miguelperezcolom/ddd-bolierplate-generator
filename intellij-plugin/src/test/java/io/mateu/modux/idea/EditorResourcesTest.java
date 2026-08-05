package io.mateu.modux.idea;

import org.junit.Test;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

/**
 * That the editor bundle is reachable from the webview.
 *
 * <p>This is the link that was broken and looked fine: the bundle ships inside the plugin jar, so
 * pointing a script tag at {@code getResource()} yields a {@code jar:} URL the browser cannot
 * fetch — the page loads, the script never arrives, and the panel is simply blank. Nothing about
 * that failure is visible from the Java side, which is why it is pinned down here.
 */
public class EditorResourcesTest {

    private final EditorResources resources = new EditorResources("<!doctype html><html></html>", () -> {});

    @Test
    public void theBundleIsPackagedWithThePlugin() {
        assertTrue("build editor/ before the plugin", EditorResources.isBundled());
    }

    @Test
    public void servesTheHostPageAsTheOriginsIndex() throws IOException {
        var resource = resources.resolve("/index.html");

        assertNotNull(resource);
        assertEquals("text/html", resource.mimeType());
        assertEquals("<!doctype html><html></html>", read(resource));
    }

    @Test
    public void servesTheEditorBundleAsAModuleScript() throws IOException {
        var resource = resources.resolve("/modux-editor.js");

        assertNotNull(resource);
        // a wrong content type is enough for the browser to refuse a module script
        assertEquals("text/javascript", resource.mimeType());
        assertFalse(read(resource).isEmpty());
    }

    /**
     * The bundle is code-split and the chunk's name carries a content hash, so it is asked for by
     * a name nothing in Java knows in advance. Resolving against the classpath on demand is what
     * keeps that working without a list to maintain.
     */
    @Test
    public void servesACodeSplitChunkItWasNeverToldAbout() throws IOException {
        var resource = resources.resolve("/elk.bundled-94VUq91b.js");

        assertNotNull("the chunk name changed — resolution must not depend on knowing it", resource);
        assertEquals("text/javascript", resource.mimeType());
    }

    @Test
    public void refusesWhatIsNotThere() {
        assertNull(resources.resolve("/not-a-file.js"));
    }

    @Test
    public void refusesToClimbOutOfTheBundle() {
        assertNull(resources.resolve("/../../META-INF/plugin.xml"));
        assertNull(resources.resolve("/..%2Fplugin.xml".replace("%2F", "/")));
    }

    @Test
    public void theOriginIsWhatTheHostPageResolvesItsImportsAgainst() {
        assertTrue(EditorResources.INDEX.startsWith(EditorResources.ORIGIN + "/"));
    }

    private static String read(EditorResources.Resource resource) throws IOException {
        try (var stream = resource.stream()) {
            return new String(stream.readAllBytes(), StandardCharsets.UTF_8);
        }
    }
}
