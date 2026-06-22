package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

public class PageValidationViewModel {

    String condition;
    String fieldId;
    String message;

    public PageValidationViewModel() {
    }

    public PageValidationViewModel(String condition, String fieldId, String message) {
        this.condition = condition;
        this.fieldId = fieldId;
        this.message = message;
    }

    public String condition() {
        return condition;
    }

    public String fieldId() {
        return fieldId;
    }

    public String message() {
        return message;
    }
}
