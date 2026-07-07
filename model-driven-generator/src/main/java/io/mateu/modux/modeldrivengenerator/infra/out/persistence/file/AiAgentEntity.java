package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An AI agent that consumes the system through MCP. Drawing agent → use case on the context
 * map records the consumption here AND flips {@code UseCaseEntity.exposedAsMcp} on — the
 * bounded context will expose that use case as an MCP tool.
 */
public record AiAgentEntity(
        String id,
        String name,
        String description,
        List<String> allowedUseCaseIds,
        /**
         * External-system operations this agent may call. Together with the MCP use cases
         * they form the agent's whole tool surface; how the call is bridged (gateway, ACL…)
         * is a later decision — this only declares the consumption.
         */
        List<String> allowedExternalUseCaseIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-external-operations callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds) {
        this(id, name, description, allowedUseCaseIds, List.of());
    }

    public List<String> allowedUseCaseIds() {
        return allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }

    public List<String> allowedExternalUseCaseIds() {
        return allowedExternalUseCaseIds != null ? allowedExternalUseCaseIds : List.of();
    }
}
