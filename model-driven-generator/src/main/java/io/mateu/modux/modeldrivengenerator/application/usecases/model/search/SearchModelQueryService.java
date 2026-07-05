package io.mateu.modux.modeldrivengenerator.application.usecases.model.search;

import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ElementTypeRegistry;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.storage.ModelYaml;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

/**
 * Full-text search over the whole specification: an element matches when the query appears in its
 * id, its name, or ANY line of its YAML serialization (descriptions, field names, invariants,
 * step intents…). This is the single search behind every entry point — the UI search page and the
 * MCP {@code search_elements} tool — so an agent and a human always see the same results.
 *
 * <p>Case-insensitive substring matching over the store's own YAML form (via {@link ModelYaml}),
 * ranked id &gt; name &gt; content. A blank query lists the whole model (no snippets).
 */
@Service
@RequiredArgsConstructor
public class SearchModelQueryService {

    /** Matching YAML lines reported per element. */
    private static final int MAX_SNIPPET_LINES = 3;
    /** Length each reported line is truncated to. */
    private static final int MAX_SNIPPET_LINE_LENGTH = 160;

    private final CommonFileRepository repository;
    private final ElementTypeRegistry registry;

    private final YAMLMapper yaml = ModelYaml.writer();

    public List<SearchHit> search(String query) {
        if (query == null || query.isBlank()) {
            return repository.allElements().stream()
                    .filter(e -> e instanceof Identifiable)
                    .map(e -> hit(e, null, null))
                    .sorted(Comparator.comparing(SearchHit::type).thenComparing(SearchHit::id))
                    .toList();
        }
        var needle = query.toLowerCase(Locale.ROOT);
        var hits = new ArrayList<SearchHit>();
        for (var element : repository.allElements()) {
            if (!(element instanceof Identifiable identifiable)) {
                continue;
            }
            var name = nameOf(element);
            SearchHit.MatchKind kind = null;
            if (identifiable.id().toLowerCase(Locale.ROOT).contains(needle)) {
                kind = SearchHit.MatchKind.ID;
            } else if (name != null && name.toLowerCase(Locale.ROOT).contains(needle)) {
                kind = SearchHit.MatchKind.NAME;
            }
            var snippet = snippet(element, needle);
            if (kind == null && snippet == null) {
                continue;
            }
            hits.add(hit(element, kind != null ? kind : SearchHit.MatchKind.CONTENT, snippet));
        }
        hits.sort(Comparator.comparing((SearchHit h) -> h.kind().ordinal())
                .thenComparing(SearchHit::type)
                .thenComparing(SearchHit::id));
        return hits;
    }

    /** The element's matching YAML lines, trimmed and joined, or null when nothing matches. */
    private String snippet(Object element, String needle) {
        String serialized;
        try {
            serialized = yaml.writeValueAsString(element);
        } catch (com.fasterxml.jackson.core.JacksonException e) {
            return null;
        }
        var lines = serialized.lines()
                .filter(line -> line.toLowerCase(Locale.ROOT).contains(needle))
                .map(String::trim)
                .map(line -> line.length() > MAX_SNIPPET_LINE_LENGTH
                        ? line.substring(0, MAX_SNIPPET_LINE_LENGTH) + "…" : line)
                .limit(MAX_SNIPPET_LINES)
                .toList();
        return lines.isEmpty() ? null : String.join(" · ", lines);
    }

    private SearchHit hit(Object element, SearchHit.MatchKind kind, String snippet) {
        var identifiable = (Identifiable) element;
        return new SearchHit(registry.nameFor(element.getClass()), typeLabel(element.getClass()),
                identifiable.id(), nameOf(element), kind, snippet);
    }

    /** Human label from the entity class name: {@code ValueObjectEntity} → {@code Value Object}. */
    private static String typeLabel(Class<?> entityClass) {
        var base = entityClass.getSimpleName().replaceAll("Entity$", "");
        return base.replaceAll("(?<=[a-z0-9])(?=[A-Z])", " ");
    }

    private static String nameOf(Object element) {
        try {
            var value = element.getClass().getMethod("name").invoke(element);
            return value != null ? value.toString() : null;
        } catch (ReflectiveOperationException e) {
            return null;
        }
    }
}
