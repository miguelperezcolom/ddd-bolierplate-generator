package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

/** Time bucket a KPI is aggregated by. */
public enum KpiTimeGrain {
    HOUR,
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    YEAR
}
