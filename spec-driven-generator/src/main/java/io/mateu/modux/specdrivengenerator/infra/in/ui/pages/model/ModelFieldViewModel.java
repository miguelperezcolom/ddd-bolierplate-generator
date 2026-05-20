package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
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

    FieldDataType type;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    @Colspan(2)
            @DetailFormCustomisation(position = FormPosition.modal)
    List<ModelFieldValidationViewModel> validations = new ArrayList<>();

}
