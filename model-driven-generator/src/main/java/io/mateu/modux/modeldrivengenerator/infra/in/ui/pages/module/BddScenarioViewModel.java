package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import jakarta.validation.constraints.NotEmpty;

public class BddScenarioViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String feature;

    @NotEmpty
    String name;

    String tags;

    String steps;

}
