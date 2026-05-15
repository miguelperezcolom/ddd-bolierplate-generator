package io.mateu.mdd.specdrivengenerator.application.usecases.module;

public record BddScenarioData(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
