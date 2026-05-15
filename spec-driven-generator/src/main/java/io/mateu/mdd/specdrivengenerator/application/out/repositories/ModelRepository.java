package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo.ModelId;

public interface ModelRepository extends Repository<Model, ModelId> {
}
