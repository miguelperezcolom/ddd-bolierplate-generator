package io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter;

public record UiMenuItem(
        String label,
        String icon,
        String description,
        String route
) {
}
