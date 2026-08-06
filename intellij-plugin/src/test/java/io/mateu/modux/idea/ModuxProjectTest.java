package io.mateu.modux.idea;

import com.intellij.openapi.application.WriteAction;
import com.intellij.testFramework.fixtures.BasePlatformTestCase;

/**
 * Resolution by nearest marker (§4.6): which model a file belongs to, with no notion of a
 * "current project" anywhere — that state is what would force a picker back into the UI.
 */
public class ModuxProjectTest extends BasePlatformTestCase {

    public void testADirectoryHoldingTheMarkerIsItsOwnRoot() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        marker(model);

        assertEquals(model, ModuxProject.rootFor(model));
    }

    public void testAFileDeepInsideTheModelResolvesToTheRoot() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        marker(model);
        var element = WriteAction.computeAndWait(() ->
                model.createChildDirectory(this, "aggregates").createChildData(this, "booking.yaml"));

        assertEquals(model, ModuxProject.rootFor(element));
    }

    public void testTheNEARESTMarkerWins() throws Exception {
        var outer = myFixture.getTempDirFixture().findOrCreateDir("outer");
        marker(outer);
        var inner = WriteAction.computeAndWait(() -> outer.createChildDirectory(this, "inner"));
        marker(inner);

        assertEquals(inner, ModuxProject.rootFor(inner));
    }

    public void testAFileInNoModelResolvesToNothing() throws Exception {
        var stray = myFixture.getTempDirFixture().createFile("elsewhere/notes.md", "");

        assertNull(ModuxProject.rootFor(stray));
    }

    public void testTheMarkerIsWhatTheEditorOpensOn() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        var index = marker(model);

        assertTrue(ModuxProject.isMarker(index));
        assertFalse(ModuxProject.isMarker(model));
    }

    /** `index.yaml` is a common name; the editor must not offer itself for someone else's. */
    public void testAnIndexYamlThatIsNotAModelIsNotAMarker() throws Exception {
        var docs = myFixture.getTempDirFixture().findOrCreateDir("docs");
        var foreign = WriteAction.computeAndWait(() -> {
            var file = docs.createChildData(this, ModuxProject.MARKER);
            file.setBinaryContent("title: Guía\nnav:\n  - intro.md\n".getBytes());
            return file;
        });

        assertFalse(ModuxProject.isMarker(foreign));
        assertNull(ModuxProject.rootFor(foreign));
    }

    public void testAModuxDirWithTheMarkerIsACatalog() throws Exception {
        var catalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");
        marker(catalog);

        assertTrue(ModuxProject.isCatalog(catalog));
    }

    /** A stray `.modux/` without a model inside must not answer as a catalog. */
    public void testAModuxDirWithoutTheMarkerIsNotACatalog() throws Exception {
        var notCatalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");

        assertFalse(ModuxProject.isCatalog(notCatalog));
    }

    /** A view document, wherever it lives, resolves to the nearest catalog walking up. */
    public void testAViewResolvesToTheNearestCatalog() throws Exception {
        var catalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");
        marker(catalog);
        var repoRoot = catalog.getParent();
        var view = WriteAction.computeAndWait(() ->
                repoRoot.createChildDirectory(this, "docs").createChildData(this, "reservas.modux-view.yaml"));

        assertEquals(catalog, ModuxProject.catalogRootFor(view));
    }

    public void testAViewDocumentIsRecognisedBySuffix() throws Exception {
        var dir = myFixture.getTempDirFixture().findOrCreateDir("docs");
        var view = WriteAction.computeAndWait(() -> dir.createChildData(this, "reservas.modux-view.yaml"));
        var plain = WriteAction.computeAndWait(() -> dir.createChildData(this, "reservas.yaml"));

        assertTrue(ModuxProject.isViewDocument(view));
        assertFalse(ModuxProject.isViewDocument(plain));
    }

    private com.intellij.openapi.vfs.VirtualFile marker(com.intellij.openapi.vfs.VirtualFile dir) throws Exception {
        return WriteAction.computeAndWait(() -> {
            var file = dir.createChildData(this, ModuxProject.MARKER);
            file.setBinaryContent("formatVersion: 1\ncounts:\n  aggregates: 1\n".getBytes());
            return file;
        });
    }
}
