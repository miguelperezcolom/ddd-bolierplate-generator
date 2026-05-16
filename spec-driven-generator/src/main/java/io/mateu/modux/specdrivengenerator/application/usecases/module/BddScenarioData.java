package io.mateu.modux.specdrivengenerator.application.usecases.module;

public record BddScenarioData(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
