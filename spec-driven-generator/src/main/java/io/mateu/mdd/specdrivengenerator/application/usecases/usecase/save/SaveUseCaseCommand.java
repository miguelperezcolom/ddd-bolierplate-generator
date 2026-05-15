package io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save;

public record SaveUseCaseCommand(String id, String name,
                                 boolean exposedAsRest,
                                 boolean exposedAsGrpc,
                                 boolean exposedAsMcp,
                                 boolean exposedAsAsync,
                                 boolean exposedAsUi) {
}
