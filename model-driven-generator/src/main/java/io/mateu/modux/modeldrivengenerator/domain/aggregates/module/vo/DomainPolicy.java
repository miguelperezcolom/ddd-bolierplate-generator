package io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo;

public record DomainPolicy(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
