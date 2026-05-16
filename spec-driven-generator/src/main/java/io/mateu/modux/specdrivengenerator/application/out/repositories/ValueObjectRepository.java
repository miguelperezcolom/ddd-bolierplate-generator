package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.valueobject.ValueObject;
import io.mateu.modux.specdrivengenerator.domain.aggregates.valueobject.vo.ValueObjectId;

public interface ValueObjectRepository extends Repository<ValueObject, ValueObjectId> {
}
