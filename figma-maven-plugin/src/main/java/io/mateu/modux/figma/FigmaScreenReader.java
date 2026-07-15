package io.mateu.modux.figma;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Reads a Figma file (the REST {@code GET /v1/files/:key} JSON) whose screens were composed with
 * the Mateu component library, and maps every top-level frame to a {@link Screen} through the
 * Mateu design contract. Same conventions as modux's {@code importfigma} use case: instances of
 * {@code Mateu/*} become nodes (variants + {@code #config} + text overrides as params, instance
 * internals are chrome), sections absorb the siblings that follow them, plain frames group, and
 * {@code Mateu · *} library canvases are skipped.
 */
public class FigmaScreenReader {

    private record Entry(String kind, Map<String, String> texts) {}

    private final Map<String, Entry> contract = new LinkedHashMap<>();
    private final Map<String, String> componentNamesById = new LinkedHashMap<>();

    public FigmaScreenReader(Path contractOverride) throws Exception {
        JsonNode root;
        if (contractOverride != null) {
            root = new ObjectMapper().readTree(Files.readString(contractOverride));
        } else {
            try (InputStream in = getClass().getResourceAsStream("/figma/mateu-contract.json")) {
                root = new ObjectMapper().readTree(in);
            }
        }
        for (JsonNode component : root.path("components")) {
            Map<String, String> texts = new HashMap<>();
            component.path("texts").fields().forEachRemaining(e -> texts.put(e.getKey(), e.getValue().asText()));
            contract.put(component.path("name").asText(),
                    new Entry(component.path("kind").asText(), texts));
        }
    }

    public List<Screen> read(Path figmaFileJson) throws Exception {
        JsonNode file = new ObjectMapper().readTree(Files.readString(figmaFileJson));
        return read(file);
    }

    public List<Screen> read(JsonNode file) {
        componentNamesById.clear();
        indexComponents(file);
        List<Screen> screens = new ArrayList<>();
        for (JsonNode canvas : file.path("document").path("children")) {
            if (!"CANVAS".equals(canvas.path("type").asText())) continue;
            if (canvas.path("name").asText().startsWith("Mateu ·")) continue;
            for (JsonNode frame : canvas.path("children")) {
                if (!"FRAME".equals(frame.path("type").asText())) continue;
                List<Screen.Node> content = foldSections(mapChildren(frame));
                String name = frame.path("name").asText();
                String type = containsKind(content, "wizard") ? "wizard"
                        : containsKind(content, "crud") ? "crud" : "form";
                screens.add(new Screen(name, "/" + kebab(name), type, content));
            }
        }
        return screens;
    }

    private void indexComponents(JsonNode file) {
        JsonNode componentSets = file.path("componentSets");
        file.path("components").fields().forEachRemaining(entry -> {
            JsonNode component = entry.getValue();
            String setId = component.path("componentSetId").asText("");
            String name = !setId.isEmpty()
                    ? componentSets.path(setId).path("name").asText()
                    : component.path("name").asText();
            componentNamesById.put(entry.getKey(), name);
            if (!setId.isEmpty()) {
                componentNamesById.put(entry.getKey() + "#variant", component.path("name").asText());
            }
        });
    }

    private List<Screen.Node> mapChildren(JsonNode node) {
        List<Screen.Node> out = new ArrayList<>();
        for (JsonNode child : node.path("children")) {
            Screen.Node mapped = mapNode(child);
            if (mapped != null) out.add(mapped);
        }
        return out;
    }

    private Screen.Node mapNode(JsonNode node) {
        String type = node.path("type").asText();
        if ("INSTANCE".equals(type)) return mapInstance(node);
        if ("FRAME".equals(type) || "GROUP".equals(type) || "SECTION".equals(type)) {
            List<Screen.Node> children = foldSections(mapChildren(node));
            if (children.isEmpty()) return null;
            String kind = "HORIZONTAL".equals(node.path("layoutMode").asText())
                    ? "horizontalLayout" : "verticalLayout";
            return new Screen.Node(kind, null, null, null, null, null, Map.of(), children);
        }
        if ("TEXT".equals(type)) {
            return new Screen.Node("text", null, node.path("characters").asText(), null, null, null,
                    Map.of(), List.of());
        }
        return null;
    }

    private Screen.Node mapInstance(JsonNode instance) {
        String componentId = instance.path("componentId").asText();
        String componentName = componentNamesById.getOrDefault(componentId, "");
        Entry entry = contract.get(componentName);
        if (entry == null) return null;

        Map<String, String> params = new LinkedHashMap<>();
        String variantString = componentNamesById.getOrDefault(componentId + "#variant", "");
        for (String pair : variantString.split(",")) {
            String[] keyValue = pair.trim().split("=", 2);
            if (keyValue.length == 2 && !keyValue[1].isBlank()) params.put(keyValue[0].trim(), keyValue[1].trim());
        }
        collectTexts(instance, entry, params);

        String title = params.remove("title");
        String text = params.remove("text");
        String label = params.remove("label");
        String fieldId = params.remove("fieldId");
        String stereotype = params.remove("stereotype");
        return new Screen.Node(entry.kind(), title, text, label, fieldId, stereotype, params, List.of());
    }

    private void collectTexts(JsonNode node, Entry entry, Map<String, String> params) {
        for (JsonNode child : node.path("children")) {
            if ("TEXT".equals(child.path("type").asText())) {
                String layerName = child.path("name").asText();
                String characters = child.path("characters").asText();
                if ("#config".equals(layerName)) {
                    for (String pair : characters.split(";")) {
                        String[] keyValue = pair.trim().split("=", 2);
                        if (keyValue.length == 2 && !keyValue[1].isBlank()) {
                            params.put(keyValue[0].trim(), keyValue[1].trim());
                        }
                    }
                } else {
                    String param = entry.texts().get(layerName);
                    if (param != null && !characters.isBlank()) params.put(param, characters);
                }
            } else if (child.has("children")) {
                collectTexts(child, entry, params);
            }
        }
    }

    private List<Screen.Node> foldSections(List<Screen.Node> siblings) {
        if (siblings.stream().noneMatch(n -> "section".equals(n.kind()))) return siblings;
        List<Screen.Node> out = new ArrayList<>();
        Screen.Node current = null;
        List<Screen.Node> absorbed = new ArrayList<>();
        for (Screen.Node sibling : siblings) {
            if ("section".equals(sibling.kind())) {
                if (current != null) out.add(withChildren(current, absorbed));
                current = sibling;
                absorbed = new ArrayList<>();
            } else if (current != null) {
                absorbed.add(sibling);
            } else {
                out.add(sibling);
            }
        }
        if (current != null) out.add(withChildren(current, absorbed));
        return out;
    }

    private static Screen.Node withChildren(Screen.Node n, List<Screen.Node> children) {
        return new Screen.Node(n.kind(), n.title(), n.text(), n.label(), n.fieldId(), n.stereotype(),
                n.params(), children);
    }

    private static boolean containsKind(List<Screen.Node> nodes, String kind) {
        for (Screen.Node node : nodes) {
            if (kind.equals(node.kind())) return true;
            if (containsKind(node.children(), kind)) return true;
        }
        return false;
    }

    static String kebab(String name) {
        return name.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
