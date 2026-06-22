package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo.GatewayId;

public interface GatewayRepository extends Repository<Gateway, GatewayId> {
}
