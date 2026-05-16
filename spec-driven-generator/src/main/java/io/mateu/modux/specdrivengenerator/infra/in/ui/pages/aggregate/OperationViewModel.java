package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.modux.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import io.mateu.uidl.annotations.HiddenInList;

import java.util.List;

public record OperationViewModel(String id,
                                 String name,
                                 String inputModelId,
                                 String outputModelId,
                                 @HiddenInList
                                 List<String> preconditions,
                                 @HiddenInList
                                 List<FieldValueSettingViewModel> sets,
                                 @HiddenInList
                                 List<String> emits,
                                 OperationType type,
                                 boolean paginated,
                                 Integer defaultPageSize) {
}
