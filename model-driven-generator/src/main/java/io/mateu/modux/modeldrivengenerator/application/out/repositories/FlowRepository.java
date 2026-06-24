package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowId;

public interface FlowRepository extends Repository<Flow, FlowId> {
}
