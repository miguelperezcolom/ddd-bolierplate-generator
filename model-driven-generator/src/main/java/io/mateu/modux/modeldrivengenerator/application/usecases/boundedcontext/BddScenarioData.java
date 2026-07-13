package io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext;

public record BddScenarioData(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
