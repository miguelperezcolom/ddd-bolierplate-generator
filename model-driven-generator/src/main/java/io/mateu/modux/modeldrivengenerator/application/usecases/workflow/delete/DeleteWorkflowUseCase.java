package io.mateu.modux.modeldrivengenerator.application.usecases.workflow.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.WorkflowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteWorkflowUseCase {

    final WorkflowRepository repository;

    public void handle(DeleteWorkflowCommand command) {
        repository.deleteAllById(command.ids().stream().map(WorkflowId::new).toList());
    }
}
