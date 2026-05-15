package io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo;

public record EnvVar(
        String name,
        String defaultValue,
        boolean secret,
        boolean required,
        String description
) {
}
