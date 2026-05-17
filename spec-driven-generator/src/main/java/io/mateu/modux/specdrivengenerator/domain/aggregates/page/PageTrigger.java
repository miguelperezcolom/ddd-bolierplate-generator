package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageTriggerType;

public record PageTrigger(
        PageTriggerType type,
        String actionId,
        Integer timeoutMillis,
        Integer times,
        String condition,
        String calledActionId,
        String propertyName,
        String eventName
) {
}
