package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create;

public record CreateUseCaseCommand(String id, String name,
                                   boolean exposedAsRest,
                                   boolean exposedAsGrpc,
                                   boolean exposedAsMcp,
                                   boolean exposedAsAsync,
                                   boolean exposedAsUi) {
}
