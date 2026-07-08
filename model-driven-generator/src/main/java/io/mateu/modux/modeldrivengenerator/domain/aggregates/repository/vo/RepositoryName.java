package io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo;

public record RepositoryName(String name) {

    public RepositoryName {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("El nombre del repositorio no puede estar vacío");
        }
    }
}
