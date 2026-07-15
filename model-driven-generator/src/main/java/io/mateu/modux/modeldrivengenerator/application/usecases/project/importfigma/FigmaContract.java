package io.mateu.modux.modeldrivengenerator.application.usecases.project.importfigma;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The Mateu design contract (mateu repo: {@code design/figma/contract.json}, mirrored at
 * {@code classpath:figma/mateu-contract.json}) — the single source of truth of the Figma
 * design-to-code pipeline: the Figma plugin builds the component library from it, and this
 * importer maps instances found in a Figma file back through it. Each entry gives the Figma
 * component name ({@code Mateu/<Category>/<Name>}), the node {@code kind}, and the text-layer →
 * parameter mapping.
 */
public class FigmaContract {

    /** One catalog entry: figma component name → node kind + text-layer mapping. */
    public record Entry(String name, String kind, Map<String, String> texts, boolean container) {}

    private final Map<String, Entry> byName = new LinkedHashMap<>();

    public static FigmaContract load(String path) throws Exception {
        JsonNode root;
        if (path != null) {
            root = new ObjectMapper().readTree(Files.readString(Path.of(path)));
        } else {
            try (InputStream in = FigmaContract.class.getResourceAsStream("/figma/mateu-contract.json")) {
                root = new ObjectMapper().readTree(in);
            }
        }
        FigmaContract contract = new FigmaContract();
        for (JsonNode component : root.path("components")) {
            Map<String, String> texts = new HashMap<>();
            component.path("texts").fields().forEachRemaining(e -> texts.put(e.getKey(), e.getValue().asText()));
            contract.byName.put(component.path("name").asText(), new Entry(
                    component.path("name").asText(),
                    component.path("kind").asText(),
                    texts,
                    component.path("container").asBoolean(false)));
        }
        return contract;
    }

    public Entry byFigmaName(String name) {
        return byName.get(name);
    }
}
