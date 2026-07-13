package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo;

/**
 * Strategic classification of a bounded context (Evans): where does this boundedContext sit in the
 * business? It drives investment advice — CORE deserves the richest patterns (event sourcing,
 * deep invariants), GENERIC is a candidate for buying off-the-shelf — and colours the context map.
 */
public enum SubdomainType {
    /** Differentiating heart of the business — invest the most here. */
    CORE,
    /** Necessary but not differentiating — keep it simple. */
    SUPPORTING,
    /** Solved problem (auth, billing, email) — consider off-the-shelf. */
    GENERIC
}
