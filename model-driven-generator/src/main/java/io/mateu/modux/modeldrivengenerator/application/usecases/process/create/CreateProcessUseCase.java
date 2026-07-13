package io.mateu.modux.modeldrivengenerator.application.usecases.process.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProcessRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.ProcessStepMapper;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.Process;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateProcessUseCase {

    final ProcessRepository repository;

    public void handle(CreateProcessCommand command) {
        var process = Process.of(
                new ProcessId(command.id()),
                new ProcessName(command.name()),
                command.description(),
                command.triggerAggregateId(),
                command.triggerEvent(),
                command.ownerBoundedContextId(),
                ProcessStepMapper.toSteps(command.steps()),
                command.onCompletionEventName(),
                command.sla());
        repository.save(process);
    }
}
