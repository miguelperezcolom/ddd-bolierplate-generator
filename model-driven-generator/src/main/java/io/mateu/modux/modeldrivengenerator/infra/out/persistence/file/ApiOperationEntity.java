package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * One operation of a first-class {@link ApiEntity}: the contract's entry point, wired to
 * whoever implements it — a bounded context (coarse), or a concrete use case / policy.
 * The wiring is architecture information: the published surface mapped onto the domain.
 */
public record ApiOperationEntity(
        String id,
        String name,
        String httpMethod,
        String path,
        String description,
        /** Coarse wiring: the bounded context that implements it (use case TBD). */
        String targetModuleId,
        /** Fine wiring: the use case (or policy) that implements it. */
        String targetUseCaseId
) {
}
