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
        List<String> allowedUseCaseIds
) implements Identifiable {

    public List<String> allowedUseCaseIds() {
        return allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }
}
