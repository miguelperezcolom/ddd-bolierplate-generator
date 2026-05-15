package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.UseCaseStepData;

import java.util.List;

public record SaveUseCaseCommand(String id, String name,
                                 boolean exposedAsRest,
                                 boolean exposedAsGrpc,
                                 boolean exposedAsMcp,
                                 boolean exposedAsAsync,
                                 boolean exposedAsUi,
                                 String inputModelId,
                                 String outputModelId,
                                 List<UseCaseStepData> steps,
                                 List<String> allowedRoles,
                                 List<String> allowedScopes,
                                 String apiVersion,
                                 String mcpDescription,
                                 String restHttpMethod,
                                 String restPath,
                                 Integer asyncRetryCount,
                                 String asyncDeadLetterQueue,
                                 String asyncOrderingKey,
                                 String asyncTopicName,
                                 String asyncConsumerGroup) {
}
