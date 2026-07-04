package io.mateu.modux.modeldrivengenerator.application.usecases.process;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessStepDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStep;

import java.util.List;

/** Maps process steps between the application dto and the domain VO. */
public final class ProcessStepMapper {

    private ProcessStepMapper() {}

    public static List<ProcessStep> toSteps(List<ProcessStepDto> dtos) {
        if (dtos == null) return List.of();
        return dtos.stream()
                .map(s -> new ProcessStep(s.id(), s.name(), s.type(), s.useCaseId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(), s.description()))
                .toList();
    }

    public static List<ProcessStepDto> toDtos(List<ProcessStep> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new ProcessStepDto(s.id(), s.name(), s.type(), s.useCaseId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(), s.description()))
                .toList();
    }
}
