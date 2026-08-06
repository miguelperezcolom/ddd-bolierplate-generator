package io.mateu.modux.idea;

import com.intellij.openapi.application.WriteAction;
import com.intellij.testFramework.fixtures.BasePlatformTestCase;

/**
 * The catalog is a `.modux/` directory (§12.3): its name is the marker, and a view document
 * resolves to the nearest one walking up — no "current project" state anywhere.
 */
public class ModuxProjectTest extends BasePlatformTestCase {

    public void testAModuxDirIsACatalog() throws Exception {
        var catalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");

        assertTrue(ModuxProject.isCatalog(catalog));
    }

    /** The name is the marker; a directory called anything else is not a catalog. */
    public void testADirNotNamedModuxIsNotACatalog() throws Exception {
        var other = myFixture.getTempDirFixture().findOrCreateDir("modux");

        assertFalse(ModuxProject.isCatalog(other));
    }

    /** A view document, wherever it lives, resolves to the nearest catalog walking up. */
    public void testAViewResolvesToTheNearestCatalog() throws Exception {
        var catalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");
        var repoRoot = catalog.getParent();
        var view = WriteAction.computeAndWait(() ->
                repoRoot.createChildDirectory(this, "docs").createChildData(this, "reservas.modux-view.yaml"));

        assertEquals(catalog, ModuxProject.catalogRootFor(view));
    }

    /** The catalog sits beside the view, not above it: the walk finds the ancestor that HOLDS it. */
    public void testAViewDeepInDocsStillFindsTheCatalog() throws Exception {
        var catalog = myFixture.getTempDirFixture().findOrCreateDir(".modux");
        var repoRoot = catalog.getParent();
        var view = WriteAction.computeAndWait(() -> repoRoot
                .createChildDirectory(this, "docs").createChildDirectory(this, "arch")
                .createChildData(this, "mapa.modux-view.yaml"));

        assertEquals(catalog, ModuxProject.catalogRootFor(view));
    }

    public void testAFileWithNoCatalogAboveResolvesToNothing() throws Exception {
        var stray = myFixture.getTempDirFixture().createFile("elsewhere/notes.modux-view.yaml", "");

        assertNull(ModuxProject.catalogRootFor(stray));
    }

    public void testAViewDocumentIsRecognisedBySuffix() throws Exception {
        var dir = myFixture.getTempDirFixture().findOrCreateDir("docs");
        var view = WriteAction.computeAndWait(() -> dir.createChildData(this, "reservas.modux-view.yaml"));
        var plain = WriteAction.computeAndWait(() -> dir.createChildData(this, "reservas.yaml"));

        assertTrue(ModuxProject.isViewDocument(view));
        assertFalse(ModuxProject.isViewDocument(plain));
    }
}
