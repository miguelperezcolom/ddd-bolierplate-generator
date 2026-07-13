package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.rag;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
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
 * RAGs (bases de conocimiento): la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class RagViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("Qué conocimiento contiene. Sus fuentes (read models, tablas, APIs, sistemas) se trazan en el diagrama.")
    String description;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(RagEntity.builder().id(id).name(name).description(description)
                .sourceReadModelIds(java.util.List.of())
                .contentSources(java.util.List.of())
                .sourceExternalTableIds(java.util.List.of())
                .sourceApiIds(java.util.List.of())
                .sourceExternalSystemIds(java.util.List.of())
                .sourceBoundedContextIds(java.util.List.of())
                .build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).description(description).build());
    }

    @Override
    public String id() {
        return id;
    }

    public RagViewModel load(RagEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
