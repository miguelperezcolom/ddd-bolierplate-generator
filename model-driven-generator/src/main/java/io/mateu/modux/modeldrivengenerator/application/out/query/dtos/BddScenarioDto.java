package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record BddScenarioDto(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
