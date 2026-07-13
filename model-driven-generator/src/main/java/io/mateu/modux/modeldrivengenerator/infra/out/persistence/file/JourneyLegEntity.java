package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import lombok.Builder;

import java.util.List;

/**
 * One hop of a journey: source element → target element. Order comes from the
 * DAG: a leg runs after the legs in {@code afterLegIds} (empty = it starts the
 * journey). Several legs after the SAME leg = a bifurcation.
 */
@Builder(toBuilder = true)
public record JourneyLegEntity(
        String id,
        String sourceId,
        String targetId,
        /** The legs this one continues; empty for the journey's first leg(s). */
        List<String> afterLegIds,
        /** Optional caption for the hop ("pide disponibilidad"). */
        String label
) {

    public JourneyLegEntity {
        if (afterLegIds == null) afterLegIds = List.of();
    }
}
