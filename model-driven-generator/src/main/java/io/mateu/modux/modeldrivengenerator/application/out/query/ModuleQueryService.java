package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ModuleQueryService extends QueryService<ModuleDto, ModuleRow, String> {
}
