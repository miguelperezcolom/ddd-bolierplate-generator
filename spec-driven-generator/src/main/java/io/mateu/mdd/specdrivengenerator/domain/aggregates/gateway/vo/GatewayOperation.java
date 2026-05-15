package io.mateu.mdd.specdrivengenerator.domain.aggregates.gateway.vo;

public record GatewayOperation(
        String id,
        String name,
        String inputModelId,
        String outputModelId
) {
}
