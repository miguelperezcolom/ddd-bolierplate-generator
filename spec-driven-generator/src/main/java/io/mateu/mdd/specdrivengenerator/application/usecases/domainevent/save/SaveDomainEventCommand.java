package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.save;

public record SaveDomainEventCommand(String id, String name, String modelId,
                                     boolean publishAsIntegrationEvent, String integrationModelId) {
}
