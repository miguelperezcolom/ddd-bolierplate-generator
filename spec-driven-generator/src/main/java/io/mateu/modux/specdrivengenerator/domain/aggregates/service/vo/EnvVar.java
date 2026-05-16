package io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo;

public record EnvVar(
        String name,
        String defaultValue,
        boolean secret,
        boolean required,
        String description
) {
}
