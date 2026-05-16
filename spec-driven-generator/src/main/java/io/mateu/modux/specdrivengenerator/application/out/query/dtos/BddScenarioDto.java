package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

public record BddScenarioDto(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
