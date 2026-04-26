package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.uidl.annotations.HiddenInList;

import java.util.List;

public record OperationViewModel(String id,
                                 String name,
                                 @HiddenInList
                                 List<String> preconditions,
                                 @HiddenInList
                                 List<FieldValueSettingViewModel> sets,
                                 @HiddenInList
                                 List<String> emits,
                                 OperationType type) {
}
