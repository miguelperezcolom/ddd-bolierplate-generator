package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.IntegrationEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.integrationevent.vo.IntegrationEventId;

public interface IntegrationEventRepository extends Repository<IntegrationEvent, IntegrationEventId> {
}
