package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record UiMenuItemEntity(
        String label,
        String icon,
        String description,
        String route
) {
}
