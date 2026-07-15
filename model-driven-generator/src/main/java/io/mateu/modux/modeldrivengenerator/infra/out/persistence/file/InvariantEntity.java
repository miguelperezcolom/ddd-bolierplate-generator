package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record InvariantEntity(
        String id,
        String name,
        List<InvariantConditionEntity> conditions
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
