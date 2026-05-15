package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

public class ModelValidationViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String condition;

    String fieldId;

    String message;

}
