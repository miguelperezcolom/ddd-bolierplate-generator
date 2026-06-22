package io.mateu.modux.modeldrivengenerator.application.usecases.scheduledtrigger.delete;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ScheduledTriggerRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteScheduledTriggerUseCase {

    final ScheduledTriggerRepository repository;

    public void handle(DeleteScheduledTriggerCommand command) {
        repository.deleteAllById(command.ids().stream().map(ScheduledTriggerId::new).toList());
    }
}
