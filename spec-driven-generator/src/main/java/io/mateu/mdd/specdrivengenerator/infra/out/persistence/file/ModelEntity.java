package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ModelEntity(
        String id,
        String name
) implements Identifiable {
}
