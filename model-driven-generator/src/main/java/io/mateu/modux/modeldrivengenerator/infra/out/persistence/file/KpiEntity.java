package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.KpiMeasure;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.KpiTimeGrain;

import java.util.List;

/**
 * A business metric declared by intent: a measure over a stream of domain events, bucketed by time
 * and sliced by dimensions (e.g. "occupancy rate per hotel per day" from CheckInCompleted events).
 * Every enterprise system needs operational reporting; declaring the KPI lets the generator derive
 * the whole chain — projection + read model + query service + dashboard widget — by convention.
 */
public record KpiEntity(
        String id,
        String name,
        String description,
        /** Domain event stream the KPI aggregates over. */
        String sourceDomainEventId,
        KpiMeasure measure,
        /** Payload field the measure applies to (unused for COUNT). */
        String valueField,
        /** Payload fields the KPI is sliced by (e.g. hotelId, roomType). */
        List<String> dimensionFields,
        KpiTimeGrain timeGrain
) {

    public KpiEntity {
        if (dimensionFields == null) dimensionFields = List.of();
    }
}
