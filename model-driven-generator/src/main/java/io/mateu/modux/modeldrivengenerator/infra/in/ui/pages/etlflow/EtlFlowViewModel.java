package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.etlflow;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlFlowEntity;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.IdentityProviderIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.IdentityProviderIdLabelSupplier;

/**
 * Integraciones (ETL): la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class EtlFlowViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    @Help("El contexto que posee (genera y opera) el pipeline.")
    String ownerBoundedContextId;

    @Lookup(search = IdentityProviderIdOptionsSupplier.class, label = IdentityProviderIdLabelSupplier.class)
    @Help("La identidad de servicio con la que corre el pipeline.")
    String identityProviderId;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(new EtlFlowEntity(id, name, description, ownerBoundedContextId,
                java.util.List.of(), identityProviderId, null));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, EtlFlowEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).description(description)
                .ownerBoundedContextId(ownerBoundedContextId).identityProviderId(identityProviderId).build());
    }

    @Override
    public String id() {
        return id;
    }

    public EtlFlowViewModel load(EtlFlowEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        ownerBoundedContextId = entity.ownerBoundedContextId();
        identityProviderId = entity.identityProviderId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
