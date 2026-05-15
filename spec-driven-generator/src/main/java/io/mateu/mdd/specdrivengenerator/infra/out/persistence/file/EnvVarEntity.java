package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

public record EnvVarEntity(
        String name,
        String defaultValue,
        boolean secret,
        boolean required,
        String description
) {
}
