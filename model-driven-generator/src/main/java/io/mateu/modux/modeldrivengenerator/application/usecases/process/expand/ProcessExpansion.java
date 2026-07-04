package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;

import java.util.List;

/**
 * The structural building blocks derived from a single business process. Task pieces are null when
 * the process has no HUMAN steps; the trigger list is empty when no step declares a deadline.
 */
public record ProcessExpansion(
        SubscriptionEntity subscription,
        SagaEntity saga,
        ModelEntity taskModel,
        ReadModelEntity taskReadModel,
        List<ScheduledTriggerEntity> deadlineTriggers,
        DomainEventEntity completionEvent
) {

    public ProcessExpansion {
        if (deadlineTriggers == null) deadlineTriggers = List.of();
    }
}
