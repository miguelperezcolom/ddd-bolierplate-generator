package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

/** One issue found by a {@link LintRule} on a specific model element. */
public record LintFinding(
        String ruleId,
        LintSeverity severity,
        String elementType,
        String elementId,
        String elementName,
        String message
) {
}
