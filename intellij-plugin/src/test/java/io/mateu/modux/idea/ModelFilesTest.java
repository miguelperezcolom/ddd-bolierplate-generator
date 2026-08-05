package io.mateu.modux.idea;

import com.intellij.openapi.application.WriteAction;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.testFramework.fixtures.BasePlatformTestCase;

import java.io.IOException;
import java.util.List;

/**
 * The Java half of the bridge, over a real IDE virtual file system.
 *
 * <p>Everything the editor knows about the repository arrives through these five operations, so
 * this is where "the plugin can read and write a model" is actually established. What it cannot
 * cover is the webview drawing — see {@link EditorResourcesTest} for the part of that which is
 * testable without a screen.
 */
public class ModelFilesTest extends BasePlatformTestCase {

    private VirtualFile root;
    private ModelFiles files;

    @Override
    protected void setUp() throws Exception {
        super.setUp();
        root = myFixture.getTempDirFixture().findOrCreateDir("modux");
        files = new ModelFiles(getProject(), root);
    }

    public void testListsOnlyTheFilesOfADirectory() throws IOException {
        write("aggregates/booking.yaml", "id: booking");
        write("aggregates/room.yaml", "id: room");
        write("boundedContexts/reservas.yaml", "id: reservas");

        assertEquals(List.of("booking.yaml", "room.yaml"), sorted(files.list("aggregates")));
    }

    public void testListingAnAbsentDirectoryIsEmptyRatherThanAnError() {
        assertEquals(List.of(), files.list("nothingHere"));
    }

    public void testReadsBackWhatItWrote() throws IOException {
        write("aggregates/booking.yaml", "id: booking\nname: Booking\n");

        assertEquals("id: booking\nname: Booking\n", files.read("aggregates/booking.yaml"));
    }

    public void testReadingAnAbsentFileFails() {
        assertThrows(IOException.class, () -> files.read("aggregates/ghost.yaml"));
    }

    public void testExistsAnswersForBothFilesAndTheirAbsence() throws IOException {
        write("index.yaml", "formatVersion: 1");

        assertTrue(files.exists("index.yaml"));
        assertFalse(files.exists("index.yml"));
    }

    /** A brand-new element type has no directory yet; the first write has to make one. */
    public void testWritingCreatesTheDirectoriesOnTheWay() throws IOException {
        files.write(List.of(new ModelFiles.FileWrite("contextMapRelations/rel-a.yaml", "id: rel-a")), List.of());

        assertTrue(files.exists("contextMapRelations/rel-a.yaml"));
        assertEquals("id: rel-a", files.read("contextMapRelations/rel-a.yaml"));
    }

    public void testAWriteAndADeleteTravelInTheSameBatch() throws IOException {
        write("aggregates/old.yaml", "id: old");

        files.write(
                List.of(new ModelFiles.FileWrite("aggregates/new.yaml", "id: new")),
                List.of("aggregates/old.yaml"));

        assertTrue(files.exists("aggregates/new.yaml"));
        assertFalse(files.exists("aggregates/old.yaml"));
    }

    /** The write rule of §4.5: touch what changed, leave the rest of the tree alone. */
    public void testWritingOneElementLeavesEveryOtherFileUntouched() throws IOException {
        write("aggregates/booking.yaml", "id: booking");
        write("aggregates/room.yaml", "id: room");
        var untouched = root.findFileByRelativePath("aggregates/room.yaml");
        assertNotNull(untouched);
        var stampBefore = untouched.getModificationStamp();

        files.write(List.of(new ModelFiles.FileWrite("aggregates/booking.yaml", "id: booking\nname: B")), List.of());

        assertEquals(stampBefore, untouched.getModificationStamp());
    }

    public void testDeletingSomethingAlreadyGoneIsNotAnError() throws IOException {
        files.write(List.of(), List.of("aggregates/ghost.yaml"));
    }

    public void testAnEmptyBatchDoesNothingAtAll() throws IOException {
        files.write(List.of(), List.of());
    }

    private void write(String path, String content) throws IOException {
        WriteAction.runAndWait(() -> {
            var separator = path.lastIndexOf('/');
            var directory = root;
            if (separator > 0) {
                for (var segment : path.substring(0, separator).split("/")) {
                    var child = directory.findChild(segment);
                    directory = child != null ? child : directory.createChildDirectory(this, segment);
                }
            }
            var name = path.substring(separator + 1);
            var file = directory.findChild(name);
            if (file == null) file = directory.createChildData(this, name);
            file.setBinaryContent(content.getBytes(java.nio.charset.StandardCharsets.UTF_8));
        });
    }

    private static List<String> sorted(List<String> names) {
        return names.stream().sorted().toList();
    }
}
