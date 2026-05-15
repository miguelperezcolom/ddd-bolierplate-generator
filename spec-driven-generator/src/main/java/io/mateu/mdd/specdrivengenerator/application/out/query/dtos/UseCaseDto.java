package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record UseCaseDto(String id, String name,
                         boolean exposedAsRest,
                         boolean exposedAsGrpc,
                         boolean exposedAsMcp,
                         boolean exposedAsAsync,
                         boolean exposedAsUi) {
}
