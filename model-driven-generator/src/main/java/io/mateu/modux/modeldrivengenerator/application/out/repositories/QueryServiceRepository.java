package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.QueryService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.queryservice.vo.QueryServiceId;

public interface QueryServiceRepository extends Repository<QueryService, QueryServiceId> {
}
