package io.mateu.modux.modeldrivengenerator.application.usecases.invariant.save;

import io.mateu.modux.modeldrivengenerator.application.usecases.invariant.InvariantConditionData;

import java.util.List;

public record SaveInvariantCommand(
        String id,
        String name,
        List<InvariantConditionData> conditions
) {
}
