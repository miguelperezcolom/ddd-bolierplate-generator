package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * A use case OFFERED by an external system — the surface our use cases call. Persisted intent
 * only: the gateway/API to reach it derives at generation time from CallExternalUseCase steps.
 */
public record ExternalSystemUseCaseEntity(
        String id,
        String name,
        String description
) {
}
