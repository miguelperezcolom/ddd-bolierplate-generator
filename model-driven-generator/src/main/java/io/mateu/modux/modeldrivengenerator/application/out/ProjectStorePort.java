package io.mateu.modux.modeldrivengenerator.application.out;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.Repository;

import java.nio.file.Path;
import java.util.Optional;

/**
 * Switches the working model store to a repository's location: the repository says
 * where the project's yamls live (a local folder, or a git checkout resolved from
 * its URL). Remembers the choice so the next start reopens the same project.
 */
public interface ProjectStorePort {

    /** Resolves the repository's location (cloning if needed) and loads the store from it. */
    Path open(Repository repository);

    Optional<String> currentRepositoryId();
}
