package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;

import java.util.List;

public record CreateQueryServiceCommand(
        String id,
        String name,
        String moduleId,
        String description,
        List<QueryOperationData> operations
) {
}
