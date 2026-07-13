package io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo;

/**
 * Strategic DDD context-map relationship patterns (Evans). Classifies how two bounded
 * contexts relate on the {@link ContextMapRelation} (source → target).
 *
 * <p><b>Directionality convention:</b> for the asymmetric patterns, {@code sourceBoundedContextId}
 * is the <em>upstream</em> (U) context and {@code targetBoundedContextId} is the <em>downstream</em>
 * (D) context. The symmetric patterns ({@link #PARTNERSHIP}, {@link #SHARED_KERNEL},
 * {@link #SEPARATE_WAYS}) carry no up/down role — source/target are interchangeable.
 * The U/D role is therefore <em>derived</em> from (type, source, target); it is not stored
 * separately, to avoid it contradicting the direction already encoded in source/target.
 */
public enum ContextMapRelationType {
    /** Symmetric: two teams succeed or fail together and coordinate their contexts as partners. */
    PARTNERSHIP,
    /** Symmetric: both contexts share (and jointly own) a common subset of the model. */
    SHARED_KERNEL,
    /** Asymmetric: upstream publishes, downstream conforms — with a negotiated interface. */
    CUSTOMER_SUPPLIER,
    /** Asymmetric: downstream conforms to the upstream model with no negotiation. */
    CONFORMIST,
    /** Asymmetric: upstream exposes a formal protocol for multiple consumers. */
    OPEN_HOST_SERVICE,
    /** Asymmetric: downstream isolates itself from the upstream model with a translation layer. */
    ANTI_CORRUPTION_LAYER,
    /** A well-defined shared exchange language (e.g. an event schema) between the contexts. */
    PUBLISHED_LANGUAGE,
    /** Symmetric: no integration — the contexts evolve independently. */
    SEPARATE_WAYS
}
