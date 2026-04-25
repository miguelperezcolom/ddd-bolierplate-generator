package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;

import java.util.List;

public record OperationViewModel(String id,
                                 String name,
                                 List<String> preconditions,
                                 List<FieldValueSettingViewModel> sets,
                                 List<String> emits,
                                 OperationType type) {
}
