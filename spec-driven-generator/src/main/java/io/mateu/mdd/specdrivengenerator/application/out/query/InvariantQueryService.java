package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface InvariantQueryService extends QueryService<InvariantDto, InvariantRow, String> {
}
