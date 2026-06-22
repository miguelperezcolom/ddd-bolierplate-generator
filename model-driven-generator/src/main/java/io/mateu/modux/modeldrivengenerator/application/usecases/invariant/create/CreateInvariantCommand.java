package io.mateu.modux.modeldrivengenerator.application.usecases.invariant.create;

import io.mateu.modux.modeldrivengenerator.application.usecases.invariant.InvariantConditionData;

import java.util.List;

public record CreateInvariantCommand(
        String id,
        String name,
        List<InvariantConditionData> conditions
) {
}
