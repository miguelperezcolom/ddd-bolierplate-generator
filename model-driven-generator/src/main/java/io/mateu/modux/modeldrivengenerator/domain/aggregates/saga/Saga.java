package io.mateu.modux.modeldrivengenerator.domain.aggregates.saga;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.*;
import lombok.Getter;

import java.util.List;

@Getter
public class Saga {

    private SagaId id;
    private SagaName name;
    private Long timeoutMs;
    private Long compensationTimeoutMs;
    private List<String> triggeringEventIds;
    private List<SagaStep> steps;
    private Integer maxRetries;
    private Long retryBackoffMs;
    private String deadLetterQueue;
    private boolean persistenceEnabled;
    private Integer defaultMaxStepExecutions;

    public static Saga of(SagaId id, SagaName name,
                          Long timeoutMs,
                          Long compensationTimeoutMs,
                          List<String> triggeringEventIds,
                          List<SagaStep> steps,
                          Integer maxRetries,
                          Long retryBackoffMs,
                          String deadLetterQueue,
                          boolean persistenceEnabled,
                          Integer defaultMaxStepExecutions) {
        var saga = new Saga();
        saga.id = id;
        saga.name = name;
        saga.timeoutMs = timeoutMs;
        saga.compensationTimeoutMs = compensationTimeoutMs;
        saga.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        saga.steps = steps != null ? steps : List.of();
        saga.maxRetries = maxRetries;
        saga.retryBackoffMs = retryBackoffMs;
        saga.deadLetterQueue = deadLetterQueue;
        saga.persistenceEnabled = persistenceEnabled;
        saga.defaultMaxStepExecutions = defaultMaxStepExecutions;
        return saga;
    }

    public static Saga load(String id, String name,
                            Long timeoutMs,
                            Long compensationTimeoutMs,
                            List<String> triggeringEventIds,
                            List<SagaStep> steps,
                            Integer maxRetries,
                            Long retryBackoffMs,
                            String deadLetterQueue,
                            boolean persistenceEnabled,
                            Integer defaultMaxStepExecutions) {
        var saga = new Saga();
        saga.id = new SagaId(id);
        saga.name = new SagaName(name);
        saga.timeoutMs = timeoutMs;
        saga.compensationTimeoutMs = compensationTimeoutMs;
        saga.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        saga.steps = steps != null ? steps : List.of();
        saga.maxRetries = maxRetries;
        saga.retryBackoffMs = retryBackoffMs;
        saga.deadLetterQueue = deadLetterQueue;
        saga.persistenceEnabled = persistenceEnabled;
        saga.defaultMaxStepExecutions = defaultMaxStepExecutions;
        return saga;
    }

    public void update(SagaName name,
                       Long timeoutMs,
                       Long compensationTimeoutMs,
                       List<String> triggeringEventIds,
                       List<SagaStep> steps,
                       Integer maxRetries,
                       Long retryBackoffMs,
                       String deadLetterQueue,
                       boolean persistenceEnabled,
                       Integer defaultMaxStepExecutions) {
        this.name = name;
        this.timeoutMs = timeoutMs;
        this.compensationTimeoutMs = compensationTimeoutMs;
        this.triggeringEventIds = triggeringEventIds != null ? triggeringEventIds : List.of();
        this.steps = steps != null ? steps : List.of();
        this.maxRetries = maxRetries;
        this.retryBackoffMs = retryBackoffMs;
        this.deadLetterQueue = deadLetterQueue;
        this.persistenceEnabled = persistenceEnabled;
        this.defaultMaxStepExecutions = defaultMaxStepExecutions;
    }
}
