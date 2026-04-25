package io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate;

import io.mateu.mdd.specdrivengenerator.application.query.dtos.FieldDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.query.dtos.OperationDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.Operation;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.DomainEventName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.FieldValueSetting;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationName;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.operation.vo.OperationPrecondition;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.shared.vo.Field;
import lombok.Getter;

import java.util.List;

@Getter
public class Aggregate {

    private AggregateId id;
    private AggregateName name;
    private List<Field> fields;
    private List<Operation> operations;
    private List<Invariant> invariants;

    public static Aggregate load(String id, String name, List<FieldDto> fields, List<OperationDto> operations, List<InvariantDto> invariants) {
        var aggregate = new Aggregate();
        aggregate.id = new AggregateId(id);
        aggregate.name = new AggregateName(name);
        aggregate.fields = fields.stream().map(field -> new Field(
                field.name(),
                field.label(),
                field.type(),
                field.help(),
                field.valueObjectId(),
                field.entityId(),
                field.primitiveType(),
                field.mandatory(),
                field.readonly(),
                field.visible(),
                field.editable(),
                field.searchable(),
                field.filterable()
        )).toList();
        aggregate.operations = operations.stream().map(operation -> Operation.of(
                new OperationId(operation.id()),
                new OperationName(operation.name()),
                operation.preconditions().stream().map(OperationPrecondition::new).toList(),
                operation.sets().stream().map(setting -> new FieldValueSetting(setting.fieldName(), setting.value())).toList(),
                operation.emits().stream().map(DomainEventName::new).toList(),
                operation.type()
        )).toList();
        aggregate.invariants = invariants.stream()
                .map(invariant -> Invariant.of(new InvariantId(invariant.id()),
                        new InvariantName(invariant.name())))
                .toList();
        return aggregate;
    }

    public static Aggregate of(AggregateId id, AggregateName name, List<Field> fields, List<Operation> operations, List<Invariant> invariants) {
        var aggregate = new Aggregate();
        aggregate.id = id;
        aggregate.name = name;
        aggregate.fields = fields;
        aggregate.operations = operations;
        aggregate.invariants = invariants;
        return aggregate;
    }

    public void update(AggregateName name, List<Field> fields, List<OperationDto> operations, List<InvariantDto> invariants) {
        this.name = name;
        this.fields = fields;
        this.operations = operations.stream().map(operationDto -> Operation.of(
                new OperationId(operationDto.id()),
                new OperationName(operationDto.name()),
                operationDto.preconditions() != null?operationDto.preconditions().stream().map(OperationPrecondition::new).toList():List.of(),
                operationDto.sets() != null?operationDto.sets().stream().map(setting -> new FieldValueSetting(setting.fieldName(), setting.value())).toList():List.of(),
                operationDto.emits() != null?operationDto.emits().stream().map(DomainEventName::new).toList():List.of(),
                operationDto.type()
        )).toList();
        this.invariants = invariants.stream()
                .map(invariant -> Invariant.of(new InvariantId(invariant.id()),
                        new InvariantName(invariant.name())))
                .toList();
    }
}
