package io.mateu.mdd.specdrivengenerator.domain.aggregates.operation;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.FieldValueSettingDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.DomainEventName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.FieldValueSetting;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationPrecondition;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationType;
import lombok.Getter;

import java.util.List;

@Getter
public class Operation {
    OperationId id;
    OperationName name;
    String inputModelId;
    String outputModelId;
    List<OperationPrecondition> preconditions;
    List<FieldValueSetting> sets;
    List<DomainEventName> emits;
    OperationType type;
    boolean paginated;
    Integer defaultPageSize;

    public static Operation of(OperationId id,
                               OperationName name,
                               String inputModelId,
                               String outputModelId,
                               List<OperationPrecondition> preconditions,
                               List<FieldValueSetting> sets,
                               List<DomainEventName> emits,
                               OperationType type,
                               boolean paginated,
                               Integer defaultPageSize) {
        var operation = new Operation();
        operation.id = id;
        operation.name = name;
        operation.inputModelId = inputModelId;
        operation.outputModelId = outputModelId;
        operation.preconditions = preconditions;
        operation.sets = sets;
        operation.emits = emits;
        operation.type = type;
        operation.paginated = paginated;
        operation.defaultPageSize = defaultPageSize;
        return operation;
    }

    public static Operation load(String id,
                                 String name,
                                 String inputModelId,
                                 String outputModelId,
                                 List<String> preconditions,
                                 List<FieldValueSettingDto> sets,
                                 List<String> emits,
                                 OperationType type,
                                 boolean paginated,
                                 Integer defaultPageSize) {
        var operation = new Operation();
        operation.id = new OperationId(id);
        operation.name = new OperationName(name);
        operation.inputModelId = inputModelId;
        operation.outputModelId = outputModelId;
        operation.preconditions = preconditions.stream().map(OperationPrecondition::new).toList();
        operation.sets = sets.stream().map(setting -> new FieldValueSetting(setting.fieldName(), setting.value())).toList();
        operation.emits = emits.stream().map(DomainEventName::new).toList();
        operation.type = type;
        operation.paginated = paginated;
        operation.defaultPageSize = defaultPageSize;
        return operation;
    }

    public void update(OperationName name,
                       String inputModelId,
                       List<OperationPrecondition> preconditions,
                       List<FieldValueSetting> sets,
                       List<DomainEventName> emits,
                       OperationType type) {
        this.name = name;
        this.inputModelId = inputModelId;
        this.preconditions = preconditions;
        this.sets = sets;
        this.emits = emits;
        this.type = type;
    }

}