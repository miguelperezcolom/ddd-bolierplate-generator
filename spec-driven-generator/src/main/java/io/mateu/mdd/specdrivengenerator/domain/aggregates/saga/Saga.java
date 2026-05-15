package io.mateu.mdd.specdrivengenerator.domain.aggregates.saga;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Saga {

    private SagaId id;
    private SagaName name;
    private List<String> triggeringEventIds;
    private List<SagaStep> steps;

    public static Saga of(SagaId id, SagaName name,
                          List<String> triggeringEventIds,
                          List<SagaStep> steps) {
        var saga = new Saga();
        saga.id = id;
        saga.name = name;
        saga.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        saga.steps = steps != null ? steps : List.of();
        return saga;
    }

    public static Saga load(String id, String name,
                            List<String> triggeringEventIds,
                            List<SagaStep> steps) {
        var saga = new Saga();
        saga.id = new SagaId(id);
        saga.name = new SagaName(name);
        saga.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        saga.steps = steps != null ? steps : List.of();
        return saga;
    }

    public void update(SagaName name,
                       List<String> triggeringEventIds,
                       List<SagaStep> steps) {
        this.name = name;
        this.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        this.steps = steps != null ? steps : List.of();
    }
}
