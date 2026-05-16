package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

public class ModelFieldValidationViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    ModelFieldValidationType type;

    String params;

}
