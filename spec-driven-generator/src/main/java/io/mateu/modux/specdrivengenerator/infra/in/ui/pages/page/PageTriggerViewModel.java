package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageTriggerType;

public class PageTriggerViewModel {

    PageTriggerType type;
    String actionId;
    Integer timeoutMillis;
    Integer times;
    String condition;
    String calledActionId;
    String propertyName;
    String eventName;

    public PageTriggerViewModel() {
    }

    public PageTriggerViewModel(PageTriggerType type, String actionId, Integer timeoutMillis, Integer times,
                                String condition, String calledActionId, String propertyName, String eventName) {
        this.type = type;
        this.actionId = actionId;
        this.timeoutMillis = timeoutMillis;
        this.times = times;
        this.condition = condition;
        this.calledActionId = calledActionId;
        this.propertyName = propertyName;
        this.eventName = eventName;
    }

    public PageTriggerType type() {
        return type;
    }

    public String actionId() {
        return actionId;
    }

    public Integer timeoutMillis() {
        return timeoutMillis;
    }

    public Integer times() {
        return times;
    }

    public String condition() {
        return condition;
    }

    public String calledActionId() {
        return calledActionId;
    }

    public String propertyName() {
        return propertyName;
    }

    public String eventName() {
        return eventName;
    }
}
