package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;

import java.util.List;

public record CreateQueryServiceCommand(
        String id,
        String name,
        String serviceId,
        String description,
        List<QueryOperationData> operations
) {
}
