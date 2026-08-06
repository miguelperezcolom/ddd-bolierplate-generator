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

    public void testAnElementFileResolvesToItsTypeAndId() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        marker(model);
        var element = WriteAction.computeAndWait(() ->
                model.createChildDirectory(this, "aggregates").createChildData(this, "booking.yaml"));

        var resolved = ModuxProject.elementFileOf(element);
        assertNotNull(resolved);
        assertEquals(model, resolved.root());
        assertEquals("aggregates", resolved.type());
        assertEquals("booking", resolved.id());
    }

    /** The marker is opened whole, never as an element of itself. */
    public void testTheMarkerIsNotAnElementFile() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        var index = marker(model);

        assertNull(ModuxProject.elementFileOf(index));
    }

    /** A yaml right under the root has no type bucket, so it is not an element. */
    public void testAYamlDirectlyUnderTheRootIsNotAnElementFile() throws Exception {
        var model = myFixture.getTempDirFixture().findOrCreateDir("modux");
        marker(model);
        var loose = WriteAction.computeAndWait(() -> model.createChildData(this, "notes.yaml"));

        assertNull(ModuxProject.elementFileOf(loose));
    }

    /** A yaml in a bucket whose parent is not a model is not an element — no editor on foreign files. */
    public void testAYamlInABucketOutsideAnyModelIsNotAnElementFile() throws Exception {
        var stray = myFixture.getTempDirFixture()
                .createFile("elsewhere/aggregates/booking.yaml", "name: Booking\n");

        assertNull(ModuxProject.elementFileOf(stray));
    }

    private com.intellij.openapi.vfs.VirtualFile marker(com.intellij.openapi.vfs.VirtualFile dir) throws Exception {
        return WriteAction.computeAndWait(() -> {
            var file = dir.createChildData(this, ModuxProject.MARKER);
            file.setBinaryContent("formatVersion: 1\ncounts:\n  aggregates: 1\n".getBytes());
            return file;
        });
    }
}
