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
        List<UiMenuItemEntity> children
) {

    /** Backward-compatible constructor (pre-pageId/children callers and stores). */
    public UiMenuItemEntity(String label, String icon, String description, String route) {
        this(label, icon, description, route, null, List.of());
    }
}
