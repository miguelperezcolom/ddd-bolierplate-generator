package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.EnumIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.EnumIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.uidl.annotations.*;
import io.mateu.uidl.data.FieldDataType;
import io.mateu.uidl.data.FormPosition;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

public class ModelFieldViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    boolean basicType;

    @Hidden("state.basicType")
    FieldDataType type;

    @Hidden("!state.basicType || state.isEnum")
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    @Hidden("state.basicType")
    boolean isEnum;

    @Hidden("state.basicType || !state.isEnum")
    @Lookup(search = EnumIdOptionsSupplier.class, label = EnumIdLabelSupplier.class)
    String enumId;

    @Colspan(2)
            @DetailFormCustomisation(position = FormPosition.modal)
    List<ModelFieldValidationViewModel> validations = new ArrayList<>();

}
