package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** View-document integrity: a document's viewId must resolve to a catalog view (P-lienzo-1). */
class ViewDocumentCheckerTest {

    private Path repo;

    private void writeView(String relPath, String body) throws Exception {
        var file = repo.resolve(relPath);
        Files.createDirectories(file.getParent());
        Files.writeString(file, body);
    }

    @Test
    void reportsOnlyTheDanglingAndMalformedDocuments() throws Exception {
        repo = Files.createTempDirectory("modux-repo");
        // A document that resolves, one that dangles, one with no viewId, one that is not YAML.
        writeView("docs/ok.modux-view.yaml", "viewId: view-reservas\nkind: context-map\n");
        writeView("views/gone.modux-view.yaml", "viewId: view-borrada\nkind: aggregates\n");
        writeView("views/nameless.modux-view.yaml", "kind: context-map\n");
        writeView("views/broken.modux-view.yaml", "viewId: [oops\n");
        // Pruned trees must not be walked: a dangling document under node_modules is ignored.
        writeView("node_modules/pkg/stale.modux-view.yaml", "viewId: view-borrada\n");
        // A plain yaml is not a view document.
        writeView("docs/notes.yaml", "viewId: view-borrada\n");

        var violations = ViewDocumentChecker.check(repo, Set.of("view-reservas"));

        assertEquals(3, violations.size(), violations.toString());
        assertTrue(violations.stream().anyMatch(v -> v.elementId().equals("views/gone.modux-view.yaml")
                && v.missingId().equals("view-borrada")));
        assertTrue(violations.stream().anyMatch(v -> v.elementId().equals("views/nameless.modux-view.yaml")
                && v.field().equals("viewId")));
        assertTrue(violations.stream().anyMatch(v -> v.elementId().equals("views/broken.modux-view.yaml")
                && v.missingId().startsWith("illegible")));
    }

    @Test
    void aRepoWithNoDocumentsOrNoRootIsClean() throws Exception {
        repo = Files.createTempDirectory("modux-empty");

        assertEquals(List.of(), ViewDocumentChecker.check(repo, Set.of("view-reservas")));
        assertEquals(List.of(), ViewDocumentChecker.check(null, Set.of("view-reservas")));
    }
}
