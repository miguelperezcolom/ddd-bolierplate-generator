package io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo;

/**
 * How a PII field is anonymized on erasure requests (GDPR right to be forgotten) and in
 * non-production data. {@link #CRYPTO_SHRED} is the event-sourcing-safe strategy: the field is
 * encrypted per subject and forgetting means destroying the key — events stay immutable.
 */
public enum AnonymizationStrategy {
    NONE,
    /** Replace with a masked value (e.g. j***@example.com). */
    MASK,
    /** Replace with a deterministic hash (joinable, not readable). */
    HASH,
    /** Physically overwrite/delete the value. */
    ERASE,
    /** Encrypt per subject; forget by destroying the key (required for event-sourced aggregates). */
    CRYPTO_SHRED
}
