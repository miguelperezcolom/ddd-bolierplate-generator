package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record QueryServiceDto(
        String id,
        String name,
        String moduleId,
        String description,
        List<QueryOperationDto> operations
) {
}
