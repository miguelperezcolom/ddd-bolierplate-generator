package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

public record GatewayOperationEntity(
        String id,
        String name,
        String inputModelId,
        String outputModelId
) {
}
