package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.enumdefinition;

import jakarta.validation.constraints.NotEmpty;

public class EnumDefinitionValueViewModel {

    @NotEmpty
    String id;

    String name;

}
