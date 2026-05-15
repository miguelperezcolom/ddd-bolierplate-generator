package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.invariant;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

public class InvariantConditionViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String expression;

    boolean custom;

    String description;

    String errorMessage;

}
