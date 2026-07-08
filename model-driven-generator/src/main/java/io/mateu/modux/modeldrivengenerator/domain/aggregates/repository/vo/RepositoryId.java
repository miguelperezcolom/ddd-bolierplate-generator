package io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo;

public record RepositoryId(String id) {

    public RepositoryId {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("El id del repositorio no puede estar vacío");
        }
    }
}
