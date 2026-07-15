package io.mateu.modux.modeldrivengenerator.application.usecases.project.importfigma;

import com.fasterxml.jackson.databind.JsonNode;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

/**
 * Pure mapper from a Figma file (the REST {@code GET /v1/files/:key} JSON) to modux pages: every
 * top-level FRAME on a canvas becomes a {@link PageEntity} whose {@code content} is the tree of
 * {@link UiComponentNodeEntity}s recognized through the Mateu design contract.
 *
 * <p>Conventions (see mateu {@code design/figma/README.md}):
 *
 * <ul>
 *   <li>Instances of {@code Mateu/*} library components become nodes of the contract's
 *       {@code kind}; anything else drawn free-hand is ignored.
 *   <li>Variant values (the instance's component name, {@code "theme=danger, slim=true"}) and the
 *       {@code #config} text layer ({@code "fieldId=email; actionId=save"}) become {@code params}.
 *   <li>Text layers named in the contract's {@code texts} map ({@code Title}, {@code Text}…)
 *       contribute their characters as the mapped parameter (title/text/label land on the node's
 *       typed fields; the rest into {@code params}).
 *   <li>Plain FRAMEs group children ({@code horizontalLayout}/{@code verticalLayout} by layout
 *       mode), and — like Mateu's own {@code @Section} semantics — a {@code section} node absorbs
 *       the siblings that follow it until the next section marker.
 * </ul>
 */
public class FigmaToModel {

    private final FigmaContract contract;
    private final Map<String, String> componentNamesById = new LinkedHashMap<>();

    public FigmaToModel(FigmaContract contract) {
        this.contract = contract;
    }

    public List<PageEntity> map(JsonNode figmaFile) {
        indexComponents(figmaFile);
        List<PageEntity> pages = new ArrayList<>();
        for (JsonNode canvas : figmaFile.path("document").path("children")) {
            if (!"CANVAS".equals(canvas.path("type").asText())) continue;
            // skip the generated library pages when screens live in the same file
            if (canvas.path("name").asText().startsWith("Mateu ·")) continue;
            for (JsonNode frame : canvas.path("children")) {
                if (!"FRAME".equals(frame.path("type").asText())) continue;
                pages.add(toPage(frame));
            }
        }
        return pages;
    }

    /** file.components: componentId → name; variants resolve through file.componentSets. */
    private void indexComponents(JsonNode figmaFile) {
        JsonNode componentSets = figmaFile.path("componentSets");
        figmaFile.path("components").fields().forEachRemaining(entry -> {
            JsonNode component = entry.getValue();
            String setId = component.path("componentSetId").asText("");
            String name = !setId.isEmpty()
                    ? componentSets.path(setId).path("name").asText()
                    : component.path("name").asText();
            componentNamesById.put(entry.getKey(), name);
            if (!setId.isEmpty()) {
                // remember the variant string too (the component's own name, "theme=danger, …")
                componentNamesById.put(entry.getKey() + "#variant", component.path("name").asText());
            }
        });
    }

    private PageEntity toPage(JsonNode frame) {
        List<UiComponentNodeEntity> content = foldSections(mapChildren(frame));
        String name = frame.path("name").asText();
        String type = containsKind(content, "wizard") ? "wizard"
                : containsKind(content, "crud") ? "crud" : "form";
        return new PageEntity(
                kebab(name), name, "/" + kebab(name), type, null,
                null, List.of(), null,
                null, List.of(),
                List.of(), List.of(),
                List.of(), List.of(),
                List.of(), List.of(),
                List.of(), null,
                content, null,
                null, null, null, null);
    }

    private List<UiComponentNodeEntity> mapChildren(JsonNode node) {
        List<UiComponentNodeEntity> out = new ArrayList<>();
        for (JsonNode child : node.path("children")) {
            UiComponentNodeEntity mapped = mapNode(child);
            if (mapped != null) out.add(mapped);
        }
        return out;
    }

    private UiComponentNodeEntity mapNode(JsonNode node) {
        String type = node.path("type").asText();
        if ("INSTANCE".equals(type)) {
            return mapInstance(node);
        }
        if ("FRAME".equals(type) || "GROUP".equals(type) || "SECTION".equals(type)) {
            List<UiComponentNodeEntity> children = foldSections(mapChildren(node));
            if (children.isEmpty()) return null;
            String kind = "HORIZONTAL".equals(node.path("layoutMode").asText()) ? "horizontalLayout" : "verticalLayout";
            return node(kind, null, null, null, children, Map.of());
        }
        if ("TEXT".equals(type)) {
            return node("text", null, node.path("characters").asText(), null, List.of(), Map.of());
        }
        return null;
    }

    private UiComponentNodeEntity mapInstance(JsonNode instance) {
        String componentId = instance.path("componentId").asText();
        String componentName = componentNamesById.getOrDefault(componentId, "");
        FigmaContract.Entry entry = contract.byFigmaName(componentName);
        if (entry == null) return null;

        Map<String, String> params = new LinkedHashMap<>();
        // variant axes ("theme=danger, slim=true") — the variant component's own name
        String variantString = componentNamesById.getOrDefault(componentId + "#variant", "");
        for (String pair : variantString.split(",")) {
            String[] keyValue = pair.trim().split("=", 2);
            if (keyValue.length == 2 && !keyValue[1].isBlank()) params.put(keyValue[0].trim(), keyValue[1].trim());
        }
        // text layers: contract-mapped overrides + the #config line
        collectTexts(instance, entry, params);

        String title = params.remove("title");
        String text = params.remove("text");
        String label = params.remove("label");
        String fieldId = params.remove("fieldId");
        String stereotype = params.remove("stereotype");
        // An instance's internal layers are the component's own chrome (already harvested as text
        // params above) — designers can't nest content inside instances, so containers receive
        // their children by absorbing the SIBLINGS that follow them (see foldSections).
        return new UiComponentNodeEntity(UUID.randomUUID().toString(), entry.kind(), title, text,
                label, null, null, null, null, null, fieldId, stereotype, null, List.of(), null,
                params.isEmpty() ? null : params);
    }

    private void collectTexts(JsonNode node, FigmaContract.Entry entry, Map<String, String> params) {
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

    /** Mateu's @Section semantics: a section marker absorbs the siblings that follow it. */
    private List<UiComponentNodeEntity> foldSections(List<UiComponentNodeEntity> siblings) {
        if (siblings.stream().noneMatch(n -> "section".equals(n.kind()))) return siblings;
        List<UiComponentNodeEntity> out = new ArrayList<>();
        UiComponentNodeEntity current = null;
        List<UiComponentNodeEntity> absorbed = new ArrayList<>();
        for (UiComponentNodeEntity sibling : siblings) {
            if ("section".equals(sibling.kind())) {
                if (current != null) out.add(withChildren(current, absorbed));
                current = sibling;
                absorbed = new ArrayList<>(sibling.children() != null ? sibling.children() : List.of());
            } else if (current != null) {
                absorbed.add(sibling);
            } else {
                out.add(sibling);
            }
        }
        if (current != null) out.add(withChildren(current, absorbed));
        return out;
    }

    private static UiComponentNodeEntity withChildren(UiComponentNodeEntity n, List<UiComponentNodeEntity> children) {
        return new UiComponentNodeEntity(n.id(), n.kind(), n.title(), n.text(), n.label(),
                n.useCaseId(), n.mappingId(), n.modelId(), n.queryServiceId(), n.queryOperationId(),
                n.fieldId(), n.stereotype(), n.colspan(), children, n.customCodeId(), n.params());
    }

    private static UiComponentNodeEntity node(String kind, String title, String text, String label,
                                              List<UiComponentNodeEntity> children, Map<String, String> params) {
        return new UiComponentNodeEntity(UUID.randomUUID().toString(), kind, title, text, label,
                null, null, null, null, null, null, null, null, children, null,
                params.isEmpty() ? null : params);
    }

    private static boolean containsKind(List<UiComponentNodeEntity> nodes, String kind) {
        for (UiComponentNodeEntity node : nodes) {
            if (kind.equals(node.kind())) return true;
            if (node.children() != null && containsKind(node.children(), kind)) return true;
        }
        return false;
    }

    private static String kebab(String name) {
        return name.trim().toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9]+", "-").replaceAll("(^-|-$)", "");
    }
}
