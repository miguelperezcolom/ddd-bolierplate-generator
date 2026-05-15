package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record GatewayOperationDto(
        String id,
        String name,
        String inputModelId,
        String outputModelId
) {
}
