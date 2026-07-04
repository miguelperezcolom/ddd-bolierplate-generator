package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;

public record ProcessStepDto(
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
