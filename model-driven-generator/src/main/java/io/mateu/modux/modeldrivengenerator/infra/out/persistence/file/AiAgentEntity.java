package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * An AI agent. INTERNAL agents (ours) act through tools — use cases (drawing agent → use case
 * flips {@code UseCaseEntity.exposedAsMcp} on), query services, API operations, external-system
 * operations, external MCP servers, MCP gateways — ground on RAGs, may delegate to other agents,
 * and may react to domain/application events. EXTERNAL agents (someone else's) enter the system
 * through an {@link McpGatewayEntity MCP gateway} instead of touching internal elements directly.
 */
@lombok.Builder(toBuilder = true)
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
        List<String> allowedExternalUseCaseIds,
        /** Knowledge bases ({@link RagEntity}) this agent queries for grounding. */
        List<String> ragIds,
        /** MCP servers published by external systems ({@link McpServerEntity}) this agent consumes. */
        List<String> allowedMcpServerIds,
        /** Someone else's agent: it enters through MCP gateways, never touching internals directly. */
        boolean external,
        /** API operations this agent may call as tools. */
        List<String> allowedApiOperationIds,
        /** Query services this agent may consult as read tools. */
        List<String> allowedQueryServiceIds,
        /** Agents this one delegates work to (agent-to-agent). */
        List<String> delegateAgentIds,
        /** MCP gateways this agent consumes (one curated tool surface). */
        List<String> mcpGatewayIds,
        /** Domain/application events that trigger a run of this agent (reactive agents). */
        List<String> reactsToEventIds,
        /** Whole APIs — or API proxies — this agent may call: every operation of them. */
        List<String> allowedApiIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-allowedApiIds callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds,
                         List<String> allowedExternalUseCaseIds,
                         List<String> ragIds,
                         List<String> allowedMcpServerIds,
                         boolean external,
                         List<String> allowedApiOperationIds,
                         List<String> allowedQueryServiceIds,
                         List<String> delegateAgentIds,
                         List<String> mcpGatewayIds,
                         List<String> reactsToEventIds) {
        this(id, name, description, allowedUseCaseIds, allowedExternalUseCaseIds, ragIds,
                allowedMcpServerIds, external, allowedApiOperationIds, allowedQueryServiceIds,
                delegateAgentIds, mcpGatewayIds, reactsToEventIds, List.of());
    }

    /** Backward-compatible constructor (pre-gateway callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds,
                         List<String> allowedExternalUseCaseIds,
                         List<String> ragIds,
                         List<String> allowedMcpServerIds) {
        this(id, name, description, allowedUseCaseIds, allowedExternalUseCaseIds, ragIds,
                allowedMcpServerIds, false, List.of(), List.of(), List.of(), List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-mcp-servers callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds,
                         List<String> allowedExternalUseCaseIds,
                         List<String> ragIds) {
        this(id, name, description, allowedUseCaseIds, allowedExternalUseCaseIds, ragIds,
                List.of());
    }

    /** Backward-compatible constructor (pre-rags callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds,
                         List<String> allowedExternalUseCaseIds) {
        this(id, name, description, allowedUseCaseIds, allowedExternalUseCaseIds, List.of(),
                List.of());
    }

    /** Backward-compatible constructor (pre-external-operations callers and stores). */
    public AiAgentEntity(String id, String name, String description,
                         List<String> allowedUseCaseIds) {
        this(id, name, description, allowedUseCaseIds, List.of(), List.of(), List.of());
    }

    public List<String> allowedUseCaseIds() {
        return allowedUseCaseIds != null ? allowedUseCaseIds : List.of();
    }

    public List<String> allowedExternalUseCaseIds() {
        return allowedExternalUseCaseIds != null ? allowedExternalUseCaseIds : List.of();
    }

    public List<String> ragIds() {
        return ragIds != null ? ragIds : List.of();
    }

    public List<String> allowedMcpServerIds() {
        return allowedMcpServerIds != null ? allowedMcpServerIds : List.of();
    }

    public List<String> allowedApiOperationIds() {
        return allowedApiOperationIds != null ? allowedApiOperationIds : List.of();
    }

    public List<String> allowedQueryServiceIds() {
        return allowedQueryServiceIds != null ? allowedQueryServiceIds : List.of();
    }

    public List<String> delegateAgentIds() {
        return delegateAgentIds != null ? delegateAgentIds : List.of();
    }

    public List<String> mcpGatewayIds() {
        return mcpGatewayIds != null ? mcpGatewayIds : List.of();
    }

    public List<String> reactsToEventIds() {
        return reactsToEventIds != null ? reactsToEventIds : List.of();
    }

    public List<String> allowedApiIds() {
        return allowedApiIds != null ? allowedApiIds : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public AiAgentEntity withName(String name) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withAllowedUseCaseIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, ids,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withAllowedExternalUseCaseIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                ids, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withRagIds(List<String> ragIds) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withAllowedMcpServerIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, ids, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withAllowedApiOperationIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                ids, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds, reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withAllowedQueryServiceIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, ids, delegateAgentIds, mcpGatewayIds, reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withDelegateAgentIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, ids, mcpGatewayIds,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withMcpGatewayIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, ids,
                reactsToEventIds, allowedApiIds);
    }

    public AiAgentEntity withReactsToEventIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                ids, allowedApiIds);
    }

    public AiAgentEntity withAllowedApiIds(List<String> ids) {
        return new AiAgentEntity(id, name, description, allowedUseCaseIds,
                allowedExternalUseCaseIds, ragIds, allowedMcpServerIds, external,
                allowedApiOperationIds, allowedQueryServiceIds, delegateAgentIds, mcpGatewayIds,
                reactsToEventIds, ids);
    }
}
