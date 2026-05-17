package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.Component;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentId;

public interface ComponentRepository extends Repository<Component, ComponentId> {
}
