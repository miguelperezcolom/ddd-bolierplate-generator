package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;
import java.util.Set;

/**
 * A node of a page's content tree: a Mateu layout (with children) or a leaf component.
 * Configuration is typed (not a map) so CatalogReflection walks the {@code *Id} fields
 * and referential integrity comes for free.
 */
public record UiComponentNodeEntity(
        /** Stable identity — the editor edits, moves and removes nodes by id. */
        String id,
        /** One of {@link #KINDS}: a layout or a component. */
        String kind,
        /** Heading (cards, tabs, metric cards…). */
        String title,
        /** Free text (text components). */
        String text,
        /** Caption (buttons, fields…). */
        String label,
        /** The use case a button fires. */
        String useCaseId,
        /** The model mapping applied when firing the use case. */
        String mappingId,
        /** The viewmodel a form edits. */
        String modelId,
        /** The query service a listing reads from. */
        String queryServiceId,
        String queryOperationId,
        /** The viewmodel field a field component binds to. */
        String fieldId,
        /** Rendering stereotype (fields). */
        String stereotype,
        /** Columns spanned inside a form/grid layout. */
        Integer colspan,
        /** Nested content — layouts are trees. */
        List<UiComponentNodeEntity> children
) {

    /** Kinds that lay out other nodes — only these carry children. */
    public static final Set<String> LAYOUT_KINDS = Set.of(
            "verticalLayout", "horizontalLayout", "formLayout", "splitLayout", "tabLayout",
            "tab", "accordionLayout", "card", "gridLayout", "boardLayout", "dashboardLayout",
            "masterDetailLayout", "foldoutLayout", "carouselLayout", "appLayout");

    /** Leaf components. */
    public static final Set<String> COMPONENT_KINDS = Set.of(
            "form", "listing", "button", "field", "text", "metricCard", "menuBar");

    /** Every valid node kind. */
    public static final Set<String> KINDS;

    static {
        var kinds = new java.util.HashSet<>(LAYOUT_KINDS);
        kinds.addAll(COMPONENT_KINDS);
        KINDS = Set.copyOf(kinds);
    }
}
