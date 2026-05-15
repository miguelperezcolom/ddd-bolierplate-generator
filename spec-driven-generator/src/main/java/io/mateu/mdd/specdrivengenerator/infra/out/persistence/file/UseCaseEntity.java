package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UseCaseEntity(
        String id,
        String name,
        boolean exposedAsRest,
        boolean exposedAsGrpc,
        boolean exposedAsMcp,
        boolean exposedAsAsync,
        boolean exposedAsUi,
        String inputModelId,
        String outputModelId,
        List<UseCaseStepEntity> steps
) implements Identifiable {
}
