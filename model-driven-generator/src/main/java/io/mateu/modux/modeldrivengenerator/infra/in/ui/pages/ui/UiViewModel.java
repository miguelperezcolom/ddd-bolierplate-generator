package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.ui;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiEntity;
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

/**
 * La UI declarada: la interfaz humana que expone un contexto (la gemela de la
 * API). Quién la realiza (apps y páginas) se traza en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class UiViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("Qué ofrece esta interfaz a las personas que la usan.")
    String description;

    @Lookup(search = ModuleIdOptionsSupplier.class, label = ModuleIdLabelSupplier.class)
    @Help("El bounded context que la expone (vacío = suelta).")
    String boundedContextId;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(UiEntity.builder()
                .id(id).name(name).description(description)
                .boundedContextId(boundedContextId)
                .build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, UiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocida: " + id));
        repository.save(current.toBuilder()
                .name(name).description(description).boundedContextId(boundedContextId)
                .build());
    }

    @Override
    public String id() {
        return id;
    }

    public UiViewModel load(UiEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        boundedContextId = entity.boundedContextId();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nueva UI";
    }
}
