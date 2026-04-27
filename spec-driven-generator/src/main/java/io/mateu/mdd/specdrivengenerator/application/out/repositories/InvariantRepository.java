package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;

public interface InvariantRepository extends Repository<Invariant, InvariantId> {
}
