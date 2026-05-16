package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.ScheduledTrigger;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;

public interface ScheduledTriggerRepository extends Repository<ScheduledTrigger, ScheduledTriggerId> {
}
