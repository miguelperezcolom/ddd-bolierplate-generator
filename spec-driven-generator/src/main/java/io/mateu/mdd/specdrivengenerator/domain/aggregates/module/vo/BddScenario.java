package io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo;

public record BddScenario(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) {
}
