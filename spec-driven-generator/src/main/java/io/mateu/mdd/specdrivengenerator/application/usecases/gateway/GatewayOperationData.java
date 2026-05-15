package io.mateu.mdd.specdrivengenerator.application.usecases.gateway;

public record GatewayOperationData(
        String id,
        String name,
        String inputModelId,
        String outputModelId
) {
}
