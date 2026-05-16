package io.mateu.mdd.specdrivengenerator.application.usecases.scheduledtrigger.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ScheduledTriggerRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.ScheduledTrigger;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerExecutionEnvironment;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CreateScheduledTriggerUseCase {

    final ScheduledTriggerRepository repository;

    public void handle(CreateScheduledTriggerCommand command) {
        var trigger = ScheduledTrigger.of(
                new ScheduledTriggerId(command.id()),
                new ScheduledTriggerName(command.name()),
                command.cronExpression(),
                command.timezone(),
                command.useCaseId(),
                command.modelMappingId(),
                command.description(),
                command.executionEnvironment() != null ? ScheduledTriggerExecutionEnvironment.valueOf(command.executionEnvironment()) : null,
                command.lockProvider(),
                command.maxExecutionTimeMs(),
                command.failureNotificationEmail());
        repository.save(trigger);
    }
}
