package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.businessrule;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

public class BusinessRuleConditionViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String expression;

    String description;

}
