package io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerExecutionEnvironment;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerName;
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

    public static ScheduledTrigger of(ScheduledTriggerId id, ScheduledTriggerName name,
                                      String cronExpression, String timezone, String useCaseId,
                                      String modelMappingId, String description,
                                      ScheduledTriggerExecutionEnvironment executionEnvironment) {
        var trigger = new ScheduledTrigger();
        trigger.id = id;
        trigger.name = name;
        trigger.cronExpression = cronExpression;
        trigger.timezone = timezone;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        trigger.executionEnvironment = executionEnvironment;
        return trigger;
    }

    public static ScheduledTrigger load(String id, String name,
                                        String cronExpression, String timezone, String useCaseId,
                                        String modelMappingId, String description,
                                        String executionEnvironment) {
        var trigger = new ScheduledTrigger();
        trigger.id = new ScheduledTriggerId(id);
        trigger.name = new ScheduledTriggerName(name);
        trigger.cronExpression = cronExpression;
        trigger.timezone = timezone;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        trigger.executionEnvironment = executionEnvironment != null ? ScheduledTriggerExecutionEnvironment.valueOf(executionEnvironment) : null;
        return trigger;
    }

    public void update(ScheduledTriggerName name,
                       String cronExpression, String timezone, String useCaseId,
                       String modelMappingId, String description,
                       ScheduledTriggerExecutionEnvironment executionEnvironment) {
        this.name = name;
        this.cronExpression = cronExpression;
        this.timezone = timezone;
        this.useCaseId = useCaseId;
        this.modelMappingId = modelMappingId;
        this.description = description;
        this.executionEnvironment = executionEnvironment;
    }
}
