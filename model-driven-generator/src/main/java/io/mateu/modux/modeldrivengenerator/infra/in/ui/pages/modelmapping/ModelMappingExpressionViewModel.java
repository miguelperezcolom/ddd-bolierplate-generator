package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.modelmapping;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

public class ModelMappingExpressionViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String inputExpression;

    String outputExpression;

}
