package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.module.Module;
import io.mateu.modux.specdrivengenerator.domain.aggregates.module.vo.ModuleId;

public interface ModuleRepository extends Repository<Module, ModuleId> {
}
