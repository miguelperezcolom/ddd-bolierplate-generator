package io.mateu.mdd.specdrivengenerator.application.usecases.module;

public record DomainPolicyData(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
