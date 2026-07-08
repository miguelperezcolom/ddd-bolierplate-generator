package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ExternalSystemDirection;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ExternalSystemProtocol;

import java.util.List;

/**
 * A system outside the project's bounded contexts (channel manager, payment gateway, ERP, …).
 * Enterprise systems are half integration; modelling the <em>partner</em> — not just the pipe
 * (gateway) — puts it on the context map as a node, gives NOTIFIES flows a real target, places
 * the anti-corruption layer correctly, and enables generated mocks/contract tests later.
 */
public record ExternalSystemEntity(
        String id,
        String name,
        String description,
        ExternalSystemProtocol protocol,
        ExternalSystemDirection direction,
        /** Gateway used to reach it (when direction includes OUTBOUND); null if not wired yet. */
        String gatewayId,
        /** Team/company owning the system — who to call when it breaks. */
        String owner,
        /** Architecture decisions (ADRs) this integration traces back to. */
        List<String> decisionIds,
        /** Use cases this external system offers (targets of CallExternalUseCase steps). */
        List<ExternalSystemUseCaseEntity> useCases,
        /** Tables/datasets it owns — pollable into read models (legacy integration). */
        List<ExternalSystemTableEntity> tables,
        /** Other external systems this one depends on (strategic context-map dependency). */
        List<String> dependsOnExternalSystemIds,
        /** Published APIs (or API proxies) this system depends on. */
        List<String> dependsOnApiIds
) {

    /** Backward-compatible constructor (pre-dependsOnApiIds callers and stores). */
    public ExternalSystemEntity(String id, String name, String description,
                                ExternalSystemProtocol protocol, ExternalSystemDirection direction,
                                String gatewayId, String owner, List<String> decisionIds,
                                List<ExternalSystemUseCaseEntity> useCases,
                                List<ExternalSystemTableEntity> tables,
                                List<String> dependsOnExternalSystemIds) {
        this(id, name, description, protocol, direction, gatewayId, owner, decisionIds, useCases,
                tables, dependsOnExternalSystemIds, List.of());
    }

    /** Backward-compatible constructor (pre-dependsOnExternalSystemIds callers and stores). */
    public ExternalSystemEntity(String id, String name, String description,
                                ExternalSystemProtocol protocol, ExternalSystemDirection direction,
                                String gatewayId, String owner, List<String> decisionIds,
                                List<ExternalSystemUseCaseEntity> useCases,
                                List<ExternalSystemTableEntity> tables) {
        this(id, name, description, protocol, direction, gatewayId, owner, decisionIds, useCases,
                tables, List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-tables callers and stores). */
    public ExternalSystemEntity(String id, String name, String description,
                                ExternalSystemProtocol protocol, ExternalSystemDirection direction,
                                String gatewayId, String owner, List<String> decisionIds,
                                List<ExternalSystemUseCaseEntity> useCases) {
        this(id, name, description, protocol, direction, gatewayId, owner, decisionIds, useCases,
                List.of(), List.of());
    }

    /** Backward-compatible constructor (pre-useCases callers and stores). */
    public ExternalSystemEntity(String id, String name, String description,
                                ExternalSystemProtocol protocol, ExternalSystemDirection direction,
                                String gatewayId, String owner, List<String> decisionIds) {
        this(id, name, description, protocol, direction, gatewayId, owner, decisionIds, List.of(),
                List.of(), List.of());
    }

    public List<ExternalSystemUseCaseEntity> useCases() {
        return useCases != null ? useCases : List.of();
    }

    public List<ExternalSystemTableEntity> tables() {
        return tables != null ? tables : List.of();
    }

    public List<String> dependsOnExternalSystemIds() {
        return dependsOnExternalSystemIds != null ? dependsOnExternalSystemIds : List.of();
    }

    public List<String> dependsOnApiIds() {
        return dependsOnApiIds != null ? dependsOnApiIds : List.of();
    }

    // Single-field copies: unlike the positional constructor, these can never silently
    // drop a field added to the record after the calling code was written.

    public ExternalSystemEntity withName(String name) {
        return new ExternalSystemEntity(id, name, description, protocol, direction, gatewayId,
                owner, decisionIds, useCases, tables, dependsOnExternalSystemIds, dependsOnApiIds);
    }

    public ExternalSystemEntity withUseCases(List<ExternalSystemUseCaseEntity> useCases) {
        return new ExternalSystemEntity(id, name, description, protocol, direction, gatewayId,
                owner, decisionIds, useCases, tables, dependsOnExternalSystemIds, dependsOnApiIds);
    }

    public ExternalSystemEntity withTables(List<ExternalSystemTableEntity> tables) {
        return new ExternalSystemEntity(id, name, description, protocol, direction, gatewayId,
                owner, decisionIds, useCases, tables, dependsOnExternalSystemIds, dependsOnApiIds);
    }

    public ExternalSystemEntity withDependsOnExternalSystemIds(List<String> ids) {
        return new ExternalSystemEntity(id, name, description, protocol, direction, gatewayId,
                owner, decisionIds, useCases, tables, ids, dependsOnApiIds);
    }

    public ExternalSystemEntity withDependsOnApiIds(List<String> ids) {
        return new ExternalSystemEntity(id, name, description, protocol, direction, gatewayId,
                owner, decisionIds, useCases, tables, dependsOnExternalSystemIds, ids);
    }
}
