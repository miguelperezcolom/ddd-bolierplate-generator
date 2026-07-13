package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

public record DomainPolicy(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
