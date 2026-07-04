package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import java.util.List;

/**
 * One architectural/semantic rule of the model linter. Where the referential-integrity check
 * ({@code CheckModelUseCase}) catches dangling ids, lint rules catch <em>meaningful</em> problems:
 * risky defaults, missing patterns, incoherent declarations. Pure functions over a
 * {@link ModelSnapshot} so each rule is unit-testable in isolation.
 */
public interface LintRule {

    String id();

    String description();

    List<LintFinding> apply(ModelSnapshot model);
}
