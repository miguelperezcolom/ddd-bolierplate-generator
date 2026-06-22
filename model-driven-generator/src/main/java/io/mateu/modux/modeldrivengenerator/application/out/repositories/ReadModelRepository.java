package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.ReadModel;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.readmodel.vo.ReadModelId;

public interface ReadModelRepository extends Repository<ReadModel, ReadModelId> {
}
