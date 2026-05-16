package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UseCaseEntity(
        String id,
        String name,
        boolean exposedAsRest,
        boolean exposedAsGrpc,
        boolean exposedAsMcp,
        boolean exposedAsAsync,
        boolean exposedAsUi,
        String inputModelId,
        String outputModelId,
        List<UseCaseStepEntity> steps,
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
        String asyncConsumerGroup,
        boolean cacheable,
        Integer cacheTtlSeconds,
        Long timeoutMs
) implements Identifiable {
}
