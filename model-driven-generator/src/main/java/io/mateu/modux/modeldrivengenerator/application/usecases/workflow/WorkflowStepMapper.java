package io.mateu.modux.modeldrivengenerator.application.usecases.workflow;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowStepDto;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowStep;

import java.util.List;

/** Maps workflow steps between the application dto and the domain VO. */
public final class WorkflowStepMapper {

    private WorkflowStepMapper() {}

    public static List<WorkflowStep> toSteps(List<WorkflowStepDto> dtos) {
        if (dtos == null) return List.of();
        return dtos.stream()
                .map(s -> new WorkflowStep(s.id(), s.name(), s.emittedEventName(),
                        s.targetUseCaseId(), s.completionEventName(), s.dependsOnStepIds(),
                        s.description(), s.type(), s.handoffWorkflowId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(),
                        s.formPageId()))
                .toList();
    }

    public static List<WorkflowStepDto> toDtos(List<WorkflowStep> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new WorkflowStepDto(s.id(), s.name(), s.emittedEventName(),
                        s.targetUseCaseId(), s.completionEventName(), s.dependsOnStepIds(),
                        s.description(), s.type(), s.handoffWorkflowId(), s.roleId(),
                        s.deadline(), s.escalationRoleId(), s.compensationUseCaseId(),
                        s.formPageId()))
                .toList();
    }
}
