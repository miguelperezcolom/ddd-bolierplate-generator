package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record UiMenuItemDto(
        String label,
        String icon,
        String description,
        String route,
        String pageId,
        List<UiMenuItemDto> children
) {
}
