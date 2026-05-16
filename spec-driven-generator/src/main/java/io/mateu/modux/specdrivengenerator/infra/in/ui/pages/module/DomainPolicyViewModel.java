package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

public class DomainPolicyViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    String triggeringEventId;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    String useCaseId;

    String description;

}
