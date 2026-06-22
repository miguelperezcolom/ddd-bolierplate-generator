package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.ScheduledTrigger;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;

public interface ScheduledTriggerRepository extends Repository<ScheduledTrigger, ScheduledTriggerId> {
}
