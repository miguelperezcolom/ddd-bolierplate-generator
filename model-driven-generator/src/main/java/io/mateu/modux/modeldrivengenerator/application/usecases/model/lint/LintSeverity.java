package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

/** How serious a lint finding is. */
public enum LintSeverity {
    /** The model is inconsistent — generation may produce broken output. */
    ERROR,
    /** Very likely a mistake or a risky default — review before generating. */
    WARNING,
    /** Advice: the model works, but a pattern or classification is missing. */
    INFO
}
