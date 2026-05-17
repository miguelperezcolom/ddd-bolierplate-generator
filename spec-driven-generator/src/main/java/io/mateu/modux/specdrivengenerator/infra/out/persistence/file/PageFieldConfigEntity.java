package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record PageFieldConfigEntity(
        String fieldId,
        String stereotype,
        Integer colspan,
        String style,
        String cssClass,
        String label,
        String help
) {
}
