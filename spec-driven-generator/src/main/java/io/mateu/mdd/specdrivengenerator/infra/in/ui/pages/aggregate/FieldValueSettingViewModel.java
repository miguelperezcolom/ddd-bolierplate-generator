package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;

import java.util.List;

public record FieldValueSettingViewModel(String fieldName,
                                         String value) {
}
