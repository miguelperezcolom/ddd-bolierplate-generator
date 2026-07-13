package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

/** Aggregation applied by a KPI over its source events. COUNT needs no value field; the rest do. */
public enum KpiMeasure {
    COUNT,
    SUM,
    AVG,
    MIN,
    MAX
}
