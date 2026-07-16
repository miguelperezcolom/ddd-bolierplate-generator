package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;
import java.util.Set;

/**
 * A node of a page's content tree: a Mateu layout (with children) or a leaf component.
 * Configuration is typed (not a map) so CatalogReflection walks the {@code *Id} fields
 * and referential integrity comes for free.
 */
@lombok.Builder(toBuilder = true)
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
        List<UiComponentNodeEntity> children,
        /** The hand-written code this component delegates to (the component is CUSTOM). */
        String customCodeId,
        /**
         * Extra kind-specific parameters (theme, slim, gridLayout…) — the Mateu component
         * catalog's knobs, populated e.g. by the Figma importer from the design contract.
         */
        java.util.Map<String, String> params,
        /** The page a crud/listing row opens when clicked (its ficha). */
        String detailPageId
) {

    /** Backward-compatible constructor (pre-detailPageId callers and stores). */
    public UiComponentNodeEntity(String id, String kind, String title, String text, String label,
                                 String useCaseId, String mappingId, String modelId,
                                 String queryServiceId, String queryOperationId, String fieldId,
                                 String stereotype, Integer colspan,
                                 List<UiComponentNodeEntity> children, String customCodeId,
                                 java.util.Map<String, String> params) {
        this(id, kind, title, text, label, useCaseId, mappingId, modelId, queryServiceId,
                queryOperationId, fieldId, stereotype, colspan, children, customCodeId, params, null);
    }

    /** Backward-compatible constructor (pre-params callers and stores). */
    public UiComponentNodeEntity(String id, String kind, String title, String text, String label,
                                 String useCaseId, String mappingId, String modelId,
                                 String queryServiceId, String queryOperationId, String fieldId,
                                 String stereotype, Integer colspan,
                                 List<UiComponentNodeEntity> children, String customCodeId) {
        this(id, kind, title, text, label, useCaseId, mappingId, modelId, queryServiceId,
                queryOperationId, fieldId, stereotype, colspan, children, customCodeId, null, null);
    }

    /** Backward-compatible constructor (pre-customCodeId callers and stores). */
    public UiComponentNodeEntity(String id, String kind, String title, String text, String label,
                                 String useCaseId, String mappingId, String modelId,
                                 String queryServiceId, String queryOperationId, String fieldId,
                                 String stereotype, Integer colspan,
                                 List<UiComponentNodeEntity> children) {
        this(id, kind, title, text, label, useCaseId, mappingId, modelId, queryServiceId,
                queryOperationId, fieldId, stereotype, colspan, children, null, null, null);
    }

    /** Kinds that lay out other nodes — only these carry children. */
    public static final Set<String> LAYOUT_KINDS = Set.of(
            "verticalLayout", "horizontalLayout", "formLayout", "splitLayout", "tabLayout",
            "tab", "accordionLayout", "card", "gridLayout", "boardLayout", "dashboardLayout",
            "masterDetailLayout", "foldoutLayout", "carouselLayout", "appLayout",
            // Mateu design-contract containers (Figma importer)
            "section", "zones", "wizard", "app", "hero", "toolbar", "scoreboard", "pageHeader");

    /** Leaf components. */
    public static final Set<String> COMPONENT_KINDS = Set.of(
            "form", "listing", "button", "field", "text", "metricCard", "menuBar",
            // Mateu design-contract components (see mateu design/figma/contract.json)
            "notice", "bulletedList", "separator", "statusList", "entityHeader", "kpi",
            "taskProgress", "meter", "progressBar", "progressSteps", "banner", "calloutCard",
            "emptyState", "skeleton", "timeline", "kanban", "gantt", "calendar", "stat",
            "trendChart", "heatmap", "funnel", "orgChart", "featureGrid", "testimonials", "faq",
            "commentThread", "fileList", "checklist", "comparisonCard", "crud", "filterBar",
            "fab", "appContext");

    /** Every valid node kind. */
    public static final Set<String> KINDS;

    static {
        var kinds = new java.util.HashSet<>(LAYOUT_KINDS);
        kinds.addAll(COMPONENT_KINDS);
        KINDS = Set.copyOf(kinds);
    }
}
