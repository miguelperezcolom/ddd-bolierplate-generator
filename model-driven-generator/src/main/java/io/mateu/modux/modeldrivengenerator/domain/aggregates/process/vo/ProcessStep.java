package io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo;

/**
 * One step of a business process. AUTOMATED steps run {@code useCaseId} (with optional
 * compensation); HUMAN steps create a task for {@code roleId}, optionally bounded by
 * {@code deadline} (ISO-8601 duration, e.g. PT48H) with escalation to {@code escalationRoleId}.
 */
public record ProcessStep(
        String id,
        String name,
        ProcessStepType type,
        String useCaseId,
        String roleId,
        String deadline,
        String escalationRoleId,
        String compensationUseCaseId,
        String description
) {
}
