package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record InvariantDto(
        String id,
        String name,
        List<InvariantConditionDto> conditions
) {
}
