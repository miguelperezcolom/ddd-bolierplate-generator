package io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.create;

public record CreateModelMappingCommand(String id, String name, String sourceModelId, String targetModelId) {
}
