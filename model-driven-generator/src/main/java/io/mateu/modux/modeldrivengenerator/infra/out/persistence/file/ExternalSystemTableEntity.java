package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * A table (or equivalent dataset) owned by an external/legacy system. Declaring it lets a
 * projection poll it into a read model — the classic legacy-integration move — with the
 * partner modelled instead of hidden behind a pipe.
 */
public record ExternalSystemTableEntity(
        String id,
        String name,
        String description
) {
}
