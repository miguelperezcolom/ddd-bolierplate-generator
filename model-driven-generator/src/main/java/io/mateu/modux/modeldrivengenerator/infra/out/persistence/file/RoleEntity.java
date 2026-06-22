package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record RoleEntity(
        String id,
        String name,
        List<String> allowedUseCaseIds
) implements Identifiable {
}
