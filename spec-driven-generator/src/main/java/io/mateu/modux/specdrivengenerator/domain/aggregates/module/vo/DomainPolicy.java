package io.mateu.modux.specdrivengenerator.domain.aggregates.module.vo;

public record DomainPolicy(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
