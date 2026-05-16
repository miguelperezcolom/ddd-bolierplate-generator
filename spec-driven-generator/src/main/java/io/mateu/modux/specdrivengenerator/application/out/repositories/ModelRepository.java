package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.model.Model;
import io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo.ModelId;

public interface ModelRepository extends Repository<Model, ModelId> {
}
