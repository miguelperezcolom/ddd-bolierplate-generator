package io.mateu.modux.modeldrivengenerator.application.usecases.flow.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.FlowRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveFlowUseCase {

    final FlowRepository repository;

    public void handle(SaveFlowCommand command) {
        var flow = repository.findById(new FlowId(command.id())).orElseThrow();
        flow.update(
                new FlowName(command.name()),
                command.description(),
                command.archetype(),
                command.triggerAggregateId(),
                command.triggerEvent(),
                command.targetModuleId(),
                command.readModelName(),
                command.materializedFields(),
                command.targetUseCaseId(),
                command.inputMappings(),
                command.overrides());
        repository.save(flow);
    }

}
