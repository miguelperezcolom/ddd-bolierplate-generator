package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record RoleEntity(
        String id,
        String name,
        List<String> allowedUseCaseIds,
        /** Query services this actor consumes directly (a UI is derived from them). */
        List<String> allowedQueryServiceIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-allowedQueryServiceIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds) {
        this(id, name, allowedUseCaseIds, List.of());
    }

    public List<String> allowedUseCaseIds() {
        return allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }

    public List<String> allowedQueryServiceIds() {
        return allowedQueryServiceIds != null ? allowedQueryServiceIds : List.of();
    }
}
