package io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo;

/**
 * What the app IS, beyond its menu layout ({@link UiAppVariant}):
 * a regular app, an ORCHESTRATOR (keeps state and shows nothing of its own —
 * only child pages), or a MASTER_DETAIL (a header page plus tab pages).
 */
public enum UiAppType {
    APP,
    ORCHESTRATOR,
    MASTER_DETAIL
}
