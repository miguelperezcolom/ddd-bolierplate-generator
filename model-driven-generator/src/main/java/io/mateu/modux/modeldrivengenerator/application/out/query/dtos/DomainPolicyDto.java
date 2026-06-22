package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record DomainPolicyDto(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
