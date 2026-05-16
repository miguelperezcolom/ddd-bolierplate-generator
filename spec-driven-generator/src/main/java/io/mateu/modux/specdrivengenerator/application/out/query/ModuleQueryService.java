package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModuleRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface ModuleQueryService extends QueryService<ModuleDto, ModuleRow, String> {
}
