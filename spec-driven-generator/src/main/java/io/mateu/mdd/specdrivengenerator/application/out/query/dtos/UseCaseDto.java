package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record UseCaseDto(String id, String name,
                         boolean exposedAsRest,
                         boolean exposedAsGrpc,
                         boolean exposedAsMcp,
                         boolean exposedAsAsync,
                         boolean exposedAsUi,
                         String inputModelId,
                         String outputModelId,
                         List<UseCaseStepDto> steps,
                         List<String> allowedRoles,
                         List<String> allowedScopes,
                         String apiVersion,
                         String mcpDescription,
                         String restHttpMethod,
                         String restPath) {
}
