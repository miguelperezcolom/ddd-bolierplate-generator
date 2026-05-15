package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.ScheduledTrigger;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;

public interface ScheduledTriggerRepository extends Repository<ScheduledTrigger, ScheduledTriggerId> {
}
