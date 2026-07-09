package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record UiMenuItemEntity(
        String label,
        String icon,
        String description,
        String route,
        /** The page this entry opens (referential integrity via the *Id convention). */
        String pageId,
        /** Nested submenu — Mateu menus are trees. */
        List<UiMenuItemEntity> children,
        /** Stable identity (labels repeat and rename); null on pre-id stores. */
        String id,
        /** The app this entry opens — an app is just another UI component, like a page. */
        String uiAdapterId,
        /** The use case this entry fires. An entry opens/fires exactly ONE thing. */
        String useCaseId
) {

    /** Backward-compatible constructor (pre-pageId/children callers and stores). */
    public UiMenuItemEntity(String label, String icon, String description, String route) {
        this(label, icon, description, route, null, List.of(), null, null, null);
    }

    /** Backward-compatible constructor (pre-useCaseId callers). */
    public UiMenuItemEntity(String label, String icon, String description, String route,
                            String pageId, List<UiMenuItemEntity> children, String id,
                            String uiAdapterId) {
        this(label, icon, description, route, pageId, children, id, uiAdapterId, null);
    }

    /** Backward-compatible constructor (pre-uiAdapterId callers). */
    public UiMenuItemEntity(String label, String icon, String description, String route,
                            String pageId, List<UiMenuItemEntity> children, String id) {
        this(label, icon, description, route, pageId, children, id, null, null);
    }

    /** Backward-compatible constructor (pre-id callers). */
    public UiMenuItemEntity(String label, String icon, String description, String route,
                            String pageId, List<UiMenuItemEntity> children) {
        this(label, icon, description, route, pageId, children, null, null, null);
    }
}
