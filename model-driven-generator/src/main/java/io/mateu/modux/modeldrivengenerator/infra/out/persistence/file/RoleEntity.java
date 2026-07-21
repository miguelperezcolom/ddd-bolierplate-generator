package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

@lombok.Builder(toBuilder = true)
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
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds,
            List<String> allowedQueryServiceIds, List<String> externalSystemIds,
            List<String> aiAgentIds, List<String> uiAdapterIds, String projectId) {
        this(id, name, allowedUseCaseIds, allowedQueryServiceIds, externalSystemIds,
                aiAgentIds, uiAdapterIds, projectId, null);
    }

    /** Backward-compatible constructor (pre-uiAdapterIds callers and stores). */
    public RoleEntity(String id, String name, List<String> allowedUseCaseIds,
                      List<String> allowedQueryServiceIds, List<String> externalSystemIds,
                      List<String> aiAgentIds) {
        this(id, name, allowedUseCaseIds, allowedQueryServiceIds, externalSystemIds, aiAgentIds, List.of(), null);
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
        return toBuilder().name(name).build();
    }

    public RoleEntity withAllowedUseCaseIds(List<String> ids) {
        return toBuilder().allowedUseCaseIds(ids).build();
    }

    public RoleEntity withAllowedQueryServiceIds(List<String> ids) {
        return toBuilder().allowedQueryServiceIds(ids).build();
    }

    public RoleEntity withExternalSystemIds(List<String> ids) {
        return toBuilder().externalSystemIds(ids).build();
    }

    public RoleEntity withAiAgentIds(List<String> ids) {
        return toBuilder().aiAgentIds(ids).build();
    }

    public RoleEntity withUiAdapterIds(List<String> ids) {
        return toBuilder().uiAdapterIds(ids).build();
    }
}
