package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record QueryServiceDto(
        String id,
        String name,
        String serviceId,
        String description,
        List<QueryOperationDto> operations
) {
}
