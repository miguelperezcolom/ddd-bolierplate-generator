package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record UiMenuItemEntity(
        String label,
        String icon,
        String description,
        String route
) {
}
