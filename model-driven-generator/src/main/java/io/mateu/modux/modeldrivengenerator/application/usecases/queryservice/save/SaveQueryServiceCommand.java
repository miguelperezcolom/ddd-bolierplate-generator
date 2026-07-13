package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;

import java.util.List;

public record SaveQueryServiceCommand(
        String id,
        String name,
        String boundedContextId,
        String description,
        List<QueryOperationData> operations
) {
}
