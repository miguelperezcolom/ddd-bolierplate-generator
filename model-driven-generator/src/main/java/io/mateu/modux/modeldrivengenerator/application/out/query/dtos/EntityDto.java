package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record EntityDto(String id, String name,
                        String modelId, String parentAggregateId, boolean isCollection) {
}
