package io.mateu.modux.modeldrivengenerator.application.usecases.workflow.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.WorkflowRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.WorkflowStepMapper;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.Workflow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateWorkflowUseCase {

    final WorkflowRepository repository;

    public void handle(CreateWorkflowCommand command) {
        var workflow = Workflow.of(
                new WorkflowId(command.id()),
                new WorkflowName(command.name()),
                command.description(),
                command.triggerAggregateId(),
                command.triggerDomainServiceId(),
                command.triggerUseCaseId(),
                command.triggerEvent(),
                WorkflowStepMapper.toSteps(command.steps()),
                command.onCompletionEventName(),
                command.defaultMaxStepExecutions());
        repository.save(workflow);
    }
}
