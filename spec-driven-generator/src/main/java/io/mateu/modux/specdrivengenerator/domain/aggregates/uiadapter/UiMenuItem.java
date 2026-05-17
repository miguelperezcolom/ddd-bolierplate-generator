package io.mateu.modux.specdrivengenerator.domain.aggregates.uiadapter;

public record UiMenuItem(
        String label,
        String icon,
        String description,
        String route
) {
}
