package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.Service;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ServiceId;

public interface ServiceRepository extends Repository<Service, ServiceId> {
}
