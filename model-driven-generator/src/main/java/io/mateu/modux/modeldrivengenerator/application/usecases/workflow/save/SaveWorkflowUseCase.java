package io.mateu.modux.modeldrivengenerator.application.usecases.workflow.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.WorkflowRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.WorkflowStepMapper;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveWorkflowUseCase {

    final WorkflowRepository repository;

    public void handle(SaveWorkflowCommand command) {
        var workflow = repository.findById(new WorkflowId(command.id())).orElseThrow();
        workflow.update(
                new WorkflowName(command.name()),
                command.description(),
                command.triggerAggregateId(),
                command.triggerDomainServiceId(),
                command.triggerUseCaseId(),
                command.triggerEvent(),
                WorkflowStepMapper.toSteps(command.steps()),
                command.onCompletionEventName());
        repository.save(workflow);
    }
}
