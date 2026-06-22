package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record DomainPolicyEntity(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
