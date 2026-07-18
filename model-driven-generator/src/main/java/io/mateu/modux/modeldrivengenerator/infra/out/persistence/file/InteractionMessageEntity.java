package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionMessageKind;
import lombok.Builder;

/**
 * One message of an interaction: fromRef → toRef. Refs are ids of catalog elements (actor,
 * app, page, api operation, use case, aggregate, domain service, query service, read model,
 * external system, agent, process, workflow); a ref that no longer exists is still painted
 * and flagged by the linter. Order inside the interaction is the list order.
 */
@Builder(toBuilder = true)
public record InteractionMessageEntity(
        String id,
        String fromRef,
        String toRef,
        InteractionMessageKind kind,
        /** Caption for the hop ("confirma el check-in"); for EVENT messages, the event name. */
        String label,
        /** Optional free-text condition guarding the message ("si el pago está verificado"). */
        String guard
) {
}
