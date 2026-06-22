package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

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
