package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiAdapterDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiAdapterRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface UiAdapterQueryService extends QueryService<UiAdapterDto, UiAdapterRow, String> {
}
