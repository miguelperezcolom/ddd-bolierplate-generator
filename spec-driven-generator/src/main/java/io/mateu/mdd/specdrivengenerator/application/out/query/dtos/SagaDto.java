package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record SagaDto(
        String id,
        String name,
        Long timeoutMs,
        List<String> triggeringEventIds,
        List<SagaStepDto> steps
) {
}
