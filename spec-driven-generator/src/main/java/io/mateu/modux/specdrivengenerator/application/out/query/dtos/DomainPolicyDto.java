package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

public record DomainPolicyDto(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
