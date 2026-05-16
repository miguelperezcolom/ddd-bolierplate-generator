package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record BddScenarioEntity(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
