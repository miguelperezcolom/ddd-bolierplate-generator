package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.transformation;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationEntity;
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
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.CustomCodeIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.CustomCodeIdLabelSupplier;

/**
 * Transformaciones: la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class TransformationViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = CustomCodeIdOptionsSupplier.class, label = CustomCodeIdLabelSupplier.class)
    @Help("El código a mano que la implementa. Entradas y salida se trazan en la vista de mapeados.")
    String customCodeId;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(new TransformationEntity(id, name, java.util.List.of(), null, customCodeId, null));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, TransformationEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).customCodeId(customCodeId).build());
    }

    @Override
    public String id() {
        return id;
    }

    public TransformationViewModel load(TransformationEntity entity) {
        id = entity.id();
        name = entity.name();
        customCodeId = entity.customCodeId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
