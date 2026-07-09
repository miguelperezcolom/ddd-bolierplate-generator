package io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter;

public record UiMenuItemData(
        String label,
        String icon,
        String description,
        String route,
        String pageId
) {
}
