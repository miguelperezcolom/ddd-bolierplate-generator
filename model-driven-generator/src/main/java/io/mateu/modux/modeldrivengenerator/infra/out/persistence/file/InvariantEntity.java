package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record InvariantEntity(
        String id,
        String name,
        List<InvariantConditionEntity> conditions
) implements Identifiable {
}
