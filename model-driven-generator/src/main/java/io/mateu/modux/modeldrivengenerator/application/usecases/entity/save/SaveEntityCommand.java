package io.mateu.modux.modeldrivengenerator.application.usecases.entity.save;

public record SaveEntityCommand(String id, String name,
                                String modelId, String parentAggregateId, boolean isCollection) {

}
