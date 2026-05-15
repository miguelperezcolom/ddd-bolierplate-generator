package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;

public interface ServiceRepository extends Repository<Service, ServiceId> {
}
