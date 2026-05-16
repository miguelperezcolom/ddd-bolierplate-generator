package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.ServiceId;

public interface ServiceRepository extends Repository<Service, ServiceId> {
}
