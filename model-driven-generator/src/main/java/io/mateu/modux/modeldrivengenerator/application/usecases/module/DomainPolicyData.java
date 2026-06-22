package io.mateu.modux.modeldrivengenerator.application.usecases.module;

public record DomainPolicyData(
        String id,
        String name,
        String triggeringEventId,
        String useCaseId,
        String description
) {
}
