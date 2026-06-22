package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record InvariantDto(
        String id,
        String name,
        List<InvariantConditionDto> conditions
) {
}
