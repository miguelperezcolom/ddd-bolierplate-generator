package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record RoleEntity(
        String id,
        String name,
        List<String> allowedUseCaseIds,
        /** Query services this actor consumes directly (a UI is derived from them). */
        List<String> allowedQueryServiceIds,
        /** External systems this actor depends on (a strategic context-map dependency). */
        List<String> externalSystemIds,
        /** AI agents this actor talks to (a chat/supervision UI is derived from them). */
        List<String> aiAgentIds,
        /** UI apps (UiAdapter) this actor uses — the actor→app link of the UI map. */
        List<String> uiAdapterIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-uiAdapterIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds,
                      List<String> allowedQueryServiceIds, List<String> externalSystemIds,
                      List<String> aiAgentIds) {
        this(id, name, allowedUseCaseIds, allowedQueryServiceIds, externalSystemIds, aiAgentIds, List.of());
    }

    /** Backward-compatible constructor (pre-aiAgentIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds,
                      List<String> allowedQueryServiceIds, List<String> externalSystemIds) {
        this(id, name, allowedUseCaseIds, allowedQueryServiceIds, externalSystemIds, List.of());
    }

    /** Backward-compatible constructor (pre-allowedQueryServiceIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds) {
        this(id, name, allowedUseCaseIds, List.of(), List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-externalSystemIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds,
                      List<String> allowedQueryServiceIds) {
        this(id, name, allowedUseCaseIds, allowedQueryServiceIds, List.of(), List.of());
    }

    public List<String> allowedUseCaseIds() {
        return allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }

    public List<String> allowedQueryServiceIds() {
        return allowedQueryServiceIds != null ? allowedQueryServiceIds : List.of();
    }

    public List<String> externalSystemIds() {
        return externalSystemIds != null ? externalSystemIds : List.of();
    }

    public List<String> aiAgentIds() {
        return aiAgentIds != null ? aiAgentIds : List.of();
    }

    public List<String> uiAdapterIds() {
        return uiAdapterIds != null ? uiAdapterIds : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public RoleEntity withName(String name) {
        return new RoleEntity(id, name, allowedUseCaseIds, allowedQueryServiceIds,
                externalSystemIds, aiAgentIds, uiAdapterIds);
    }

    public RoleEntity withAllowedUseCaseIds(List<String> ids) {
        return new RoleEntity(id, name, ids, allowedQueryServiceIds, externalSystemIds,
                aiAgentIds, uiAdapterIds);
    }

    public RoleEntity withAllowedQueryServiceIds(List<String> ids) {
        return new RoleEntity(id, name, allowedUseCaseIds, ids, externalSystemIds,
                aiAgentIds, uiAdapterIds);
    }

    public RoleEntity withExternalSystemIds(List<String> ids) {
        return new RoleEntity(id, name, allowedUseCaseIds, allowedQueryServiceIds, ids,
                aiAgentIds, uiAdapterIds);
    }

    public RoleEntity withAiAgentIds(List<String> ids) {
        return new RoleEntity(id, name, allowedUseCaseIds, allowedQueryServiceIds,
                externalSystemIds, ids, uiAdapterIds);
    }

    public RoleEntity withUiAdapterIds(List<String> ids) {
        return new RoleEntity(id, name, allowedUseCaseIds, allowedQueryServiceIds,
                externalSystemIds, aiAgentIds, ids);
    }
}
