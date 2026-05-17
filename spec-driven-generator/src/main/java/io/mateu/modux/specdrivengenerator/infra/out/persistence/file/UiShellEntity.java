package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record UiShellEntity(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds
) implements Identifiable {
}
