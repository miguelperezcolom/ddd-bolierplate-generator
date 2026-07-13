package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.BoundedContext;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextId;

public interface BoundedContextRepository extends Repository<BoundedContext, BoundedContextId> {
}
