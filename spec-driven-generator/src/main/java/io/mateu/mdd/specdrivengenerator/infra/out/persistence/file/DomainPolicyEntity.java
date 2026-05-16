package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

public record DomainPolicyEntity(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
