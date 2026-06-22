package io.mateu.modux.modeldrivengenerator.application.usecases.entity.create;

public record CreateEntityCommand(String id, String name,
                                  String modelId, String parentAggregateId, boolean isCollection) {

}
