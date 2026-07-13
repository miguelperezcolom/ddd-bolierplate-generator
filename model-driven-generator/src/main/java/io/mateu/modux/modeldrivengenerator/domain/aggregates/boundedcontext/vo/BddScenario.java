package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

public record BddScenario(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
