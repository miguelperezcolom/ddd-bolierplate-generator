package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * Data-scoped authorization (ABAC-lite) on a module: beyond role checks (RBAC on use cases), an
 * access policy constrains WHICH rows/instances a subject may see or act on, via a boolean
 * expression over subject and resource attributes (e.g. {@code subject.hotelId == resource.hotelId}).
 * Desugars into query filters on read models/query services, guards on use cases, and UI hiding —
 * the row-level security that enterprise apps otherwise hand-roll.
 */
public record AccessPolicyEntity(
        String id,
        String name,
        /** Id of the aggregate, read model or use case the policy applies to. */
        String appliesToId,
        /** Boolean expression over {@code subject.*} (token claims) and {@code resource.*} (row fields). */
        String expression,
        String description
) {
}
