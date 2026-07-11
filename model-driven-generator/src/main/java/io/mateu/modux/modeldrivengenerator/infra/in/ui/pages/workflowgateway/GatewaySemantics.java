package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

/** ALL/ANY belong to a JOIN; PARALLEL/EXCLUSIVE to a SPLIT — the form validates the pair. */
public enum GatewaySemantics {
    ALL,
    ANY,
    PARALLEL,
    EXCLUSIVE
}
