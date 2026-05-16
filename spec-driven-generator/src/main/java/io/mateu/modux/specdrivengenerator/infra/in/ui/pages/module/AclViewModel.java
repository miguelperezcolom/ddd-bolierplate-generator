package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

public class AclViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String externalSystem;

    String description;

    String direction;

    @Lookup(search = GatewayIdOptionsSupplier.class, label = GatewayIdLabelSupplier.class)
    String gatewayId;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    List<String> translatedDomainEventIds = new ArrayList<>();

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    List<String> translatedUseCaseIds = new ArrayList<>();

}
