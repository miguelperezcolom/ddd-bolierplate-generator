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
        List<ExternalSystemUseCaseEntity> useCases
) {

    /** Backward-compatible constructor (pre-useCases callers and stores). */
    public ExternalSystemEntity(String id, String name, String description,
                                ExternalSystemProtocol protocol, ExternalSystemDirection direction,
                                String gatewayId, String owner, List<String> decisionIds) {
        this(id, name, description, protocol, direction, gatewayId, owner, decisionIds, List.of());
    }

    public List<ExternalSystemUseCaseEntity> useCases() {
        return useCases != null ? useCases : List.of();
    }
}
