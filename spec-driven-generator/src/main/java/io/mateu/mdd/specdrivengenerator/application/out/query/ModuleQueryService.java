package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModuleRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface ModuleQueryService extends QueryService<ModuleDto, ModuleRow, String> {
}
