package io.mateu.mdd.specdrivengenerator.application.usecases.domainevent.create;

public record CreateDomainEventCommand(String id, String name, String modelId,
                                       boolean publishAsIntegrationEvent, String integrationModelId) {
}
