package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.FieldTypeDto;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.shared.vo.PrimitiveType;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.EntityIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.EntityIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ValueObjectIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ValueObjectIdOptionsSupplier;
import io.mateu.uidl.annotations.*;

@FormLayout(columns = 6)
public record FieldViewModel(String name, String label, FieldTypeDto type, @Colspan(3) String help,
                             @HiddenInList
                             @Lookup(search = ValueObjectIdOptionsSupplier.class, label = ValueObjectIdLabelSupplier.class)
                             String valueObject,
                             @Lookup(search = EntityIdOptionsSupplier.class, label = EntityIdLabelSupplier.class)
                             @HiddenInList
                             String entity,
                             @HiddenInList
                             PrimitiveType primitiveType,
                             @HiddenInList
                             boolean mandatory,
                             @HiddenInList
                             boolean readonly,
                             @HiddenInList
                             boolean visible,
                             @HiddenInList
                             boolean editable,
                             @HiddenInList
                             boolean searchable,
                             @HiddenInList
                             boolean filterable) {
}
