package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.Model;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelId;

public interface ModelRepository extends Repository<Model, ModelId> {
}
