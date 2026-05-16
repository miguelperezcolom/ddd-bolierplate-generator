package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.modelmapping;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

import java.util.ArrayList;
import java.util.List;

public class ModelMappingRuleViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    String sourceFieldId;

    String targetFieldId;

    List<ModelMappingExpressionViewModel> expressions = new ArrayList<>();

}
