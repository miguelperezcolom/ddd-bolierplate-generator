package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record DomainEventDto(String id, String name, String modelId,
                             boolean publishAsIntegrationEvent, String integrationModelId) {
}
