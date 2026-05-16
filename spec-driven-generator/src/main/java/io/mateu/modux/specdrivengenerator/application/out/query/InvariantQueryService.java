package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.InvariantRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface InvariantQueryService extends QueryService<InvariantDto, InvariantRow, String> {
}
