package io.mateu.modux.modeldrivengenerator.application.usecases.flow.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.FlowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateFlowUseCase {

    final FlowRepository repository;

    public void handle(CreateFlowCommand command) {
        var flow = Flow.of(
                new FlowId(command.id()),
                new FlowName(command.name()),
                command.description(),
                command.archetype(),
                command.triggerAggregateId(),
                command.triggerEvent(),
                command.targetBoundedContextId(),
                command.readModelName(),
                command.materializedFields(),
                command.targetUseCaseId(),
                command.inputMappings(),
                command.overrides());
        repository.save(flow);
    }

}
