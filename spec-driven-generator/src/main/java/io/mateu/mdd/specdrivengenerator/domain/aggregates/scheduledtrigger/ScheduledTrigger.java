package io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.scheduledtrigger.vo.ScheduledTriggerName;
import lombok.Getter;

@Getter
public class ScheduledTrigger {

    private ScheduledTriggerId id;
    private ScheduledTriggerName name;
    private String cronExpression;
    private String useCaseId;
    private String modelMappingId;
    private String description;

    public static ScheduledTrigger of(ScheduledTriggerId id, ScheduledTriggerName name,
                                      String cronExpression, String useCaseId,
                                      String modelMappingId, String description) {
        var trigger = new ScheduledTrigger();
        trigger.id = id;
        trigger.name = name;
        trigger.cronExpression = cronExpression;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        return trigger;
    }

    public static ScheduledTrigger load(String id, String name,
                                        String cronExpression, String useCaseId,
                                        String modelMappingId, String description) {
        var trigger = new ScheduledTrigger();
        trigger.id = new ScheduledTriggerId(id);
        trigger.name = new ScheduledTriggerName(name);
        trigger.cronExpression = cronExpression;
        trigger.useCaseId = useCaseId;
        trigger.modelMappingId = modelMappingId;
        trigger.description = description;
        return trigger;
    }

    public void update(ScheduledTriggerName name,
                       String cronExpression, String useCaseId,
                       String modelMappingId, String description) {
        this.name = name;
        this.cronExpression = cronExpression;
        this.useCaseId = useCaseId;
        this.modelMappingId = modelMappingId;
        this.description = description;
    }
}
