package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiAdapterDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiAdapterRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface UiAdapterQueryService extends QueryService<UiAdapterDto, UiAdapterRow, String> {
}
