package io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo;

public enum PageType {
    /** A generic page: its content (composition or inferred viewmodel) decides the look. */
    PAGE,
    CRUD,
    FORM,
    DASHBOARD,
    WIZARD
}
