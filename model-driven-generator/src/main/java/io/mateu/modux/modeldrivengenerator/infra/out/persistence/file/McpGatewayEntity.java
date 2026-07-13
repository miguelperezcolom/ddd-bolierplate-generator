package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An MCP gateway: OUR platform component that aggregates tool surfaces and exposes them as one
 * MCP endpoint — external MCP servers, published APIs (whole or single operations), use cases,
 * and RAGs (retrieval as a tool). External AI agents enter the system through a gateway instead
 * of touching internal elements directly; internal agents may also consume one to get a single
 * curated tool surface. How it is deployed/authenticated is a later decision.
 */
@lombok.Builder(toBuilder = true)
public record McpGatewayEntity(
        String id,
        String name,
        String description,
        /** External MCP servers it aggregates (re-exposed behind this endpoint). */
        List<String> mcpServerIds,
        /** Published APIs exposed whole — every operation becomes a tool. */
        List<String> apiIds,
        /** Single API operations exposed as tools (finer grain than a whole API). */
        List<String> apiOperationIds,
        /** Use cases exposed as tools (the gateway twin of exposedAsMcp). */
        List<String> useCaseIds,
        /** Knowledge bases exposed as retrieval tools. */
        List<String> ragIds
) implements Identifiable {

    public McpGatewayEntity {
        if (mcpServerIds == null) mcpServerIds = List.of();
        if (apiIds == null) apiIds = List.of();
        if (apiOperationIds == null) apiOperationIds = List.of();
        if (useCaseIds == null) useCaseIds = List.of();
        if (ragIds == null) ragIds = List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public McpGatewayEntity withName(String name) {
        return toBuilder().name(name).build();
    }

    public McpGatewayEntity withMcpServerIds(List<String> ids) {
        return toBuilder().mcpServerIds(ids).build();
    }

    public McpGatewayEntity withApiIds(List<String> ids) {
        return toBuilder().apiIds(ids).build();
    }

    public McpGatewayEntity withApiOperationIds(List<String> ids) {
        return toBuilder().apiOperationIds(ids).build();
    }

    public McpGatewayEntity withUseCaseIds(List<String> ids) {
        return toBuilder().useCaseIds(ids).build();
    }

    public McpGatewayEntity withRagIds(List<String> ids) {
        return toBuilder().ragIds(ids).build();
    }
}
