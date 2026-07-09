package io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter;

import java.util.List;

public record UiMenuItem(
        String label,
        String icon,
        String description,
        String route,
        String pageId,
        /** null means "unspecified" — the repository keeps whatever the store already has. */
        List<UiMenuItem> children
) {

    public UiMenuItem(String label, String icon, String description, String route) {
        this(label, icon, description, route, null, null);
    }
}
