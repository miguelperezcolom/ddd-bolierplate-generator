package io.mateu.modux.modeldrivengenerator.application.usecases.model.search;

/**
 * One element matched by a model search: where it matched ({@link MatchKind}) drives ranking, and
 * {@code snippet} carries the matching YAML line(s) so the caller can show <em>why</em> it matched
 * (null when the element is listed without a query, or matched only by id/name).
 *
 * @param type      the public element type name (e.g. {@code aggregates}), as in the type registry
 * @param typeLabel a human label for the type (e.g. {@code Aggregate})
 */
public record SearchHit(String type, String typeLabel, String id, String name,
                        MatchKind kind, String snippet) {

    public enum MatchKind { ID, NAME, CONTENT }
}
