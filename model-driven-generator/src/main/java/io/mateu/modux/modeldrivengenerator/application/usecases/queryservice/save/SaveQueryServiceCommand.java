package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;

import java.util.List;

public record SaveQueryServiceCommand(
        String id,
        String name,
        String serviceId,
        String description,
        List<QueryOperationData> operations
) {
}
