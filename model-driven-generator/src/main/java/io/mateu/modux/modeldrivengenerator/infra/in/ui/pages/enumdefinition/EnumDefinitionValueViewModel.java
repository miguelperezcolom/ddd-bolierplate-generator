package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.enumdefinition;

import jakarta.validation.constraints.NotEmpty;

public class EnumDefinitionValueViewModel {

    @NotEmpty
    String id;

    String name;

}
