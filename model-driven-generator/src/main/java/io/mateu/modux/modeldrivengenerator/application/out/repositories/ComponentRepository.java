package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.Component;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentId;

public interface ComponentRepository extends Repository<Component, ComponentId> {
}
