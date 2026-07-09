package io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo;

/** Where the repository lives: a local folder, a remote git repository, or a database. */
public enum RepositoryType {
    LOCAL,
    GIT,
    DATABASE
}
