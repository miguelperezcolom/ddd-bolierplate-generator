package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObject;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.vo.ValueObjectId;

public interface ValueObjectRepository extends Repository<ValueObject, ValueObjectId> {
}
