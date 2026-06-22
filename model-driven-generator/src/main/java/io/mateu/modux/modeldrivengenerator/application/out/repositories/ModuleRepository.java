package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.Module;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleId;

public interface ModuleRepository extends Repository<Module, ModuleId> {
}
