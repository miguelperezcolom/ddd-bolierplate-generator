package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record RoleEntity(
        String id,
        String name,
        List<String> allowedUseCaseIds,
        List<String> allowedReadModelIds
) implements Identifiable {
}
