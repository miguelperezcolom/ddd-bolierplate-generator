package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;

public interface GatewayRepository extends Repository<Gateway, GatewayId> {
}
