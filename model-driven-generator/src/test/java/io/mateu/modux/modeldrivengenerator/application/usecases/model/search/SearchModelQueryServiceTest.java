package io.mateu.modux.modeldrivengenerator.application.usecases.model.search;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Runs the full-text model search against a temp copy of the example store. The distinctive cases:
 * content-only matches (prose that id/name search cannot find), ranking (id > name > content), and
 * the blank query listing the whole model.
 */
@SpringBootTest
class SearchModelQueryServiceTest {

    static {
        System.setProperty("modux.model-file",
                new java.io.File("../.dev/data/model-driven-store.yaml").getAbsolutePath());
    }

    @Autowired
    SearchModelQueryService searchService;

    @Autowired
    CommonFileRepository repository;

    @BeforeEach
    void loadTempStore() throws Exception {
        var store = Files.readString(Path.of("..", ".dev", "data", "model-driven-store.yaml"));
        var file = Files.createTempFile("search-test-store", ".yaml");
        Files.writeString(file, store);
        repository.loadFrom(file.toAbsolutePath().toString());
    }

    @Test
    void finds_elements_by_prose_content_not_just_id_or_name() {
        // "limpieza" only appears inside a query service description in the example store
        var hits = searchService.search("limpieza");

        assertFalse(hits.isEmpty(), "content-only text should match");
        assertTrue(hits.stream().allMatch(h -> h.kind() == SearchHit.MatchKind.CONTENT),
                "neither id nor name contains 'limpieza': " + hits);
        assertTrue(hits.stream().allMatch(h -> h.snippet() != null
                        && h.snippet().toLowerCase().contains("limpieza")),
                "content matches must carry the matching line: " + hits);
    }

    @Test
    void ranks_id_matches_before_name_and_content_matches() {
        var hits = searchService.search("check-in");

        assertFalse(hits.isEmpty());
        var kinds = hits.stream().map(h -> h.kind().ordinal()).toList();
        assertEquals(kinds.stream().sorted().toList(), kinds, "hits must be ordered id > name > content");
        assertTrue(hits.stream().anyMatch(h -> h.kind() == SearchHit.MatchKind.CONTENT),
                "'check-in' appears in descriptions too: " + hits);
    }

    @Test
    void blank_query_lists_the_whole_model_without_snippets() {
        var all = searchService.search("");

        assertEquals(repository.allElements().size(), all.size());
        assertTrue(all.stream().allMatch(h -> h.kind() == null && h.snippet() == null));
    }

    @Test
    void no_match_returns_empty() {
        assertEquals(List.of(), searchService.search("zzz-not-in-the-model-zzz"));
    }

    @Test
    void type_labels_are_humanized() {
        var hits = searchService.search("");
        // "Entity" alone is legitimate (the domain-entity type, class EntityEntity) — what must
        // never leak is the Entity CLASS suffix on other labels
        assertTrue(hits.stream().map(SearchHit::typeLabel)
                        .noneMatch(l -> l.endsWith("Entity") && !l.equals("Entity")),
                "labels must not leak the Entity suffix");
        var valueObjectLabels = hits.stream()
                .filter(h -> "valueObjects".equals(h.type())).map(SearchHit::typeLabel).distinct().toList();
        assertEquals(List.of("Value Object"), valueObjectLabels, "camel-case types split into words");
    }
}
