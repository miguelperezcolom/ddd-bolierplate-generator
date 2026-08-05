package io.mateu.modux.idea;

import com.intellij.openapi.application.WriteAction;
import com.intellij.openapi.vfs.VirtualFile;
import com.intellij.testFramework.fixtures.BasePlatformTestCase;

/**
 * Finding another project's model on this machine.
 *
 * <p>This is the I/O half of referencing a project. It lives here, and not in the applier, because
 * the applier does no I/O — and that purity is what lets every other command be tested without
 * files. See {@code docs/design/ide-plugin.md} §4.7.
 */
public class ReferencedProjectsTest extends BasePlatformTestCase {

    /** A repository with a model in it, beside the others. */
    private VirtualFile repository(String name, boolean nested) throws Exception {
        return WriteAction.computeAndWait(() -> {
            var repo = myFixture.getTempDirFixture().findOrCreateDir("checkouts/" + name);
            var model = nested ? repo.createChildDirectory(this, ModuxProject.CONVENTIONAL_DIR) : repo;
            var marker = model.createChildData(this, ModuxProject.MARKER);
            marker.setBinaryContent("formatVersion: 1\ncounts: {}\n".getBytes());
            return model;
        });
    }

    /**
     * The point of keeping the git URL as the canonical form: while you work on two projects at
     * once they sit side by side, so the URL alone resolves — no network, and nothing
     * machine-specific written into the versioned model.
     */
    public void testFindsASiblingCheckoutFromTheGitUrlAlone() throws Exception {
        var here = repository("booking", true);
        var there = repository("checkin", true);

        assertEquals(there,
                ReferencedProjects.locate(here, "git@github.com:acme/checkin.git", null));
    }

    /** A model root is conventionally `<repo>/modux`, but a bare model directory is a project too. */
    public void testFindsASiblingWhoseModelIsTheRepositoryItself() throws Exception {
        var here = repository("booking", true);
        var there = repository("checkin", false);

        assertEquals(there,
                ReferencedProjects.locate(here, "https://github.com/acme/checkin", null));
    }

    public void testAnExplicitPathWins() throws Exception {
        var here = repository("booking", true);
        var there = repository("elsewhere", true);

        assertEquals(there, ReferencedProjects.locate(here,
                "git@github.com:acme/checkin.git", "../../elsewhere/modux"));
    }

    /** Not finding it is an ANSWER: the reference's snapshot is intact, only refreshing is lost. */
    public void testAnsweringNothingWhenThereIsNoCheckout() throws Exception {
        var here = repository("booking", true);

        assertNull(ReferencedProjects.locate(here, "git@github.com:acme/ausente.git", null));
        assertNull(ReferencedProjects.locate(here, null, "../../ausente/modux"));
        assertNull(ReferencedProjects.locate(here, null, null));
    }

    /** A directory that is not a model is not an answer either. */
    public void testADirectoryWithoutAMarkerIsNotAProject() throws Exception {
        var here = repository("booking", true);
        WriteAction.runAndWait(() ->
                myFixture.getTempDirFixture().findOrCreateDir("checkouts/checkin/src"));

        assertNull(ReferencedProjects.locate(here, "git@github.com:acme/checkin.git", null));
    }

    public void testReadsTheRepositoryNameOutOfEveryUrlShape() {
        assertEquals("checkin", ReferencedProjects.repositoryName("git@github.com:acme/checkin.git"));
        assertEquals("checkin", ReferencedProjects.repositoryName("https://github.com/acme/checkin"));
        assertEquals("checkin", ReferencedProjects.repositoryName("https://github.com/acme/checkin/"));
        assertEquals("checkin", ReferencedProjects.repositoryName("ssh://git@host:2222/acme/checkin.git"));
        assertNull(ReferencedProjects.repositoryName("  "));
        assertNull(ReferencedProjects.repositoryName(null));
    }
}
