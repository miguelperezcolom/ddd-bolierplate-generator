package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

/** Names a process expansion needs from the rest of the model (see the flow equivalent). */
public record ProcessExpansionContext(
        String projectName,
        String sourceServiceName,
        String aggregateName,
        String ownerModuleId,
        String ownerModuleName,
        /** Id of the declared DomainEvent matching the trigger event name; null when not declared yet. */
        String triggerEventId
) {
}
