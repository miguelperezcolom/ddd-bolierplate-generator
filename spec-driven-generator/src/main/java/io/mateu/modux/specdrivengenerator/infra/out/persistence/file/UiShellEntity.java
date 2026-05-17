package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record UiShellEntity(
        String id,
        String name,
        String title,
        String appVariant
) implements Identifiable {
}
