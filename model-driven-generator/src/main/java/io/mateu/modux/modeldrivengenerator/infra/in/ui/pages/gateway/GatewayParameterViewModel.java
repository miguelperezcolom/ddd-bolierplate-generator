package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.gateway;

import jakarta.validation.constraints.NotEmpty;

/** Editable row for a gateway operation parameter (path / query / header / cookie). */
public class GatewayParameterViewModel {

    @NotEmpty
    String name;

    /** path | query | header | cookie */
    String location;

    /** Modux field data type name, e.g. string, integer, number, bool, date. */
    String type;

    boolean required;

}
