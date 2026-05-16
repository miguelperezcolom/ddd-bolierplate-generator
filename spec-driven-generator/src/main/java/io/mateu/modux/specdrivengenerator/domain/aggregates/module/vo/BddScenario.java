package io.mateu.modux.specdrivengenerator.domain.aggregates.module.vo;

public record BddScenario(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
