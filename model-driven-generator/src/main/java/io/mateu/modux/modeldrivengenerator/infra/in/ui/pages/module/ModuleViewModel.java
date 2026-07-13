package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
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

/**
 * Módulos: la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ModuleViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    @Help("El contexto cuyos elementos distribuye. Qué elementos van dentro se decide en el nivel de distribución.")
    String boundedContextId;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(ModuleEntity.builder().id(id).name(name).boundedContextId(boundedContextId).build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).boundedContextId(boundedContextId).build());
    }

    @Override
    public String id() {
        return id;
    }

    public ModuleViewModel load(ModuleEntity entity) {
        id = entity.id();
        name = entity.name();
        boundedContextId = entity.boundedContextId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
