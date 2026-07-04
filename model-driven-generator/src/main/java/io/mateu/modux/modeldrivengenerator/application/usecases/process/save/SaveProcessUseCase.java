package io.mateu.modux.modeldrivengenerator.application.usecases.process.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProcessRepository;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.ProcessStepMapper;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveProcessUseCase {

    final ProcessRepository repository;

    public void handle(SaveProcessCommand command) {
        var process = repository.findById(new ProcessId(command.id())).orElseThrow();
        process.update(
                new ProcessName(command.name()),
                command.description(),
                command.triggerAggregateId(),
                command.triggerEvent(),
                command.ownerModuleId(),
                ProcessStepMapper.toSteps(command.steps()),
                command.onCompletionEventName(),
                command.sla());
        repository.save(process);
    }
}
