package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record SagaDto(
        String id,
        String name,
        List<String> triggeringEventIds,
        List<SagaStepDto> steps
) {
}
