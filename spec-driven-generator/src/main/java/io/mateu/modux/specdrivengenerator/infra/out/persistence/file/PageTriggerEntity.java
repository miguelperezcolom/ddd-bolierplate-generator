package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record PageTriggerEntity(
        String type,
        String actionId,
        Integer timeoutMillis,
        Integer times,
        String condition,
        String calledActionId,
        String propertyName,
        String eventName
) {
}
