package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * An MCP server published by an external system: a tool surface AI agents consume directly
 * (the external twin of our use cases' {@code exposedAsMcp}). How the connection is
 * authenticated/bridged is a later decision — this only declares the server and its endpoint.
 */
public record McpServerEntity(
        String id,
        String name,
        String description,
        /** Endpoint the agents connect to (optional while the integration settles). */
        String uri
) {
}
