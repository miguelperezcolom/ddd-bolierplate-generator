package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * External content feeding a {@link RagEntity}: a repository, a web site, an FTP server…
 * How it is crawled and refreshed is a later decision — this only declares the source.
 */
public record RagContentSourceEntity(
        /** REPO, WEB or FTP (free-form on purpose while the catalog settles). */
        String type,
        String uri
) {
}
