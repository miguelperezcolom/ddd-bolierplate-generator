package io.mateu.modux.modeldrivengenerator.application.usecases.scheduledtrigger.save;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ScheduledTriggerRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.MisfirePolicy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerExecutionEnvironment;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveScheduledTriggerUseCase {

    final ScheduledTriggerRepository repository;

    public void handle(SaveScheduledTriggerCommand command) {
        var trigger = repository.findById(new ScheduledTriggerId(command.id())).orElseThrow();
        trigger.update(
                new ScheduledTriggerName(command.name()),
                command.cronExpression(),
                command.timezone(),
                command.useCaseId(),
                command.modelMappingId(),
                command.description(),
                command.executionEnvironment() != null ? ScheduledTriggerExecutionEnvironment.valueOf(command.executionEnvironment()) : null,
                command.lockProvider(),
                command.maxExecutionTimeMs(),
                command.failureNotificationEmail(),
                command.misfirePolicy() != null ? MisfirePolicy.valueOf(command.misfirePolicy()) : null,
                command.allowConcurrentExecution(),
                command.retryOnFailure(), command.retryCount());
        repository.save(trigger);
    }
}
