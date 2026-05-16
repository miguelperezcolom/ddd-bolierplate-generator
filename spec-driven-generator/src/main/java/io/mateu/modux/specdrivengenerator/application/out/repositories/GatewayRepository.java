package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.gateway.Gateway;
import io.mateu.modux.specdrivengenerator.domain.aggregates.gateway.vo.GatewayId;

public interface GatewayRepository extends Repository<Gateway, GatewayId> {
}
