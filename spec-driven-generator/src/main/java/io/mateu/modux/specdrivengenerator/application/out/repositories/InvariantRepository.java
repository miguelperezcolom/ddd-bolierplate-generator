package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;

public interface InvariantRepository extends Repository<Invariant, InvariantId> {
}
