package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record EnvVarEntity(
        String name,
        String defaultValue,
        boolean secret,
        boolean required,
        String description
) {
}
