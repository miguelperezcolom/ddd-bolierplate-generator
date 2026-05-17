package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record BddScenarioEntity(
        String id,
        String feature,
        String name,
        String tags,
        String steps
) implements Identifiable {
}
