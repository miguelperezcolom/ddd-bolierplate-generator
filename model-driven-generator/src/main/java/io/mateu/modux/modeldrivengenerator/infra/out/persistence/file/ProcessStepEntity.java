package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;

/**
 * One step of a {@link ProcessEntity business process}. AUTOMATED steps run {@code useCaseId}
 * (with optional {@code compensationUseCaseId}); HUMAN steps create a task for {@code roleId},
 * optionally bounded by {@code deadline} (ISO-8601 duration, e.g. PT48H) with escalation to
 * {@code escalationRoleId}.
 */
public record ProcessStepEntity(
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
