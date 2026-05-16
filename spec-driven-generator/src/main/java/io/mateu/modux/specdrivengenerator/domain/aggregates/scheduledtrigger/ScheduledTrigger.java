package io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger;

import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.MisfirePolicy;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerExecutionEnvironment;
import io.mateu.modux.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerName;
import lombok.Getter;

@Getter
public class ScheduledTrigger {

    private ScheduledTriggerId id;
    private ScheduledTriggerName name;
    private String cronExpression;
    private String timezone;
    private String useCaseId;
    private String modelMappingId;
    private String description;
    private ScheduledTriggerExecutionEnvironment executionEnvironment;
    private String lockProvider;
    private Long maxExecutionTimeMs;
    private String failureNotificationEmail;
    private MisfirePolicy misfirePolicy;
    private boolean allowConcurrentExecution;
    private boolean retryOnFailure;
    private Integer retryCount;

    public static ScheduledTrigger of(ScheduledTriggerId id, ScheduledTriggerName name,
                                      String cronExpression, String timezone, String useCaseId,
                                      String modelMappingId, String description,
                                      ScheduledTriggerExecutionEnvironment executionEnvironment,
                                      String lockProvider,
                                      Long maxExecutionTimeMs, String failureNotificationEmail,
                                      MisfirePolicy misfirePolicy, boolean allowConcurrentExecution,
                                      boolean retryOnFailure, Integer retryCount) {
        var trigger = new ScheduledTrigger();
        trigger.id = id;
        trigger.name = name;
        trigger.cronExpression = cronExpression;
        trigger.timezone = timezone;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        trigger.executionEnvironment = executionEnvironment;
        trigger.lockProvider = lockProvider;
        trigger.maxExecutionTimeMs = maxExecutionTimeMs;
        trigger.failureNotificationEmail = failureNotificationEmail;
        trigger.misfirePolicy = misfirePolicy;
        trigger.allowConcurrentExecution = allowConcurrentExecution;
        trigger.retryOnFailure = retryOnFailure;
        trigger.retryCount = retryCount;
        return trigger;
    }

    public static ScheduledTrigger load(String id, String name,
                                        String cronExpression, String timezone, String useCaseId,
                                        String modelMappingId, String description,
                                        String executionEnvironment,
                                        String lockProvider,
                                        Long maxExecutionTimeMs, String failureNotificationEmail,
                                        String misfirePolicy, boolean allowConcurrentExecution,
                                        boolean retryOnFailure, Integer retryCount) {
        var trigger = new ScheduledTrigger();
        trigger.id = new ScheduledTriggerId(id);
        trigger.name = new ScheduledTriggerName(name);
        trigger.cronExpression = cronExpression;
        trigger.timezone = timezone;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        trigger.executionEnvironment = executionEnvironment != null ? ScheduledTriggerExecutionEnvironment.valueOf(executionEnvironment) : null;
        trigger.lockProvider = lockProvider;
        trigger.maxExecutionTimeMs = maxExecutionTimeMs;
        trigger.failureNotificationEmail = failureNotificationEmail;
        trigger.misfirePolicy = misfirePolicy != null ? MisfirePolicy.valueOf(misfirePolicy) : null;
        trigger.allowConcurrentExecution = allowConcurrentExecution;
        trigger.retryOnFailure = retryOnFailure;
        trigger.retryCount = retryCount;
        return trigger;
    }

    public void update(ScheduledTriggerName name,
                       String cronExpression, String timezone, String useCaseId,
                       String modelMappingId, String description,
                       ScheduledTriggerExecutionEnvironment executionEnvironment,
                       String lockProvider,
                       Long maxExecutionTimeMs, String failureNotificationEmail,
                       MisfirePolicy misfirePolicy, boolean allowConcurrentExecution,
                       boolean retryOnFailure, Integer retryCount) {
        this.name = name;
        this.cronExpression = cronExpression;
        this.timezone = timezone;
        this.useCaseId = useCaseId;
        this.modelMappingId = modelMappingId;
        this.description = description;
        this.executionEnvironment = executionEnvironment;
        this.lockProvider = lockProvider;
        this.maxExecutionTimeMs = maxExecutionTimeMs;
        this.failureNotificationEmail = failureNotificationEmail;
        this.misfirePolicy = misfirePolicy;
        this.allowConcurrentExecution = allowConcurrentExecution;
        this.retryOnFailure = retryOnFailure;
        this.retryCount = retryCount;
    }
}
