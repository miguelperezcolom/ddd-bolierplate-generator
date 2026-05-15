package io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.save;

public record SaveModelMappingCommand(String id, String name, String sourceModelId, String targetModelId) {
}
