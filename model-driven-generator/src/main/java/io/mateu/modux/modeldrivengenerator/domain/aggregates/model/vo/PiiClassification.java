package io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo;

/**
 * Privacy classification of a model field. Drives generated masking in logs and read models,
 * retention handling, and right-to-be-forgotten support — compliance concerns that are error-prone
 * to hand-roll and painful to retrofit.
 */
public enum PiiClassification {
    /** Not personal data. */
    NONE,
    /** Personal data (name, email, phone, address…). */
    PII,
    /** Special-category data (health, payment, credentials…) — strictest handling. */
    SENSITIVE
}
