package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.url;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UrlEntity;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * The URL declared on the distribution map: an address the system answers at.
 * Which service serves it is traced in the graphical editor.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class UrlViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("La dirección en sí (p. ej. https://api.acme.com).")
    String url;

    @Help("Qué se sirve en esta dirección.")
    String description;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(UrlEntity.builder()
                .id(id).name(name).url(url).description(description)
                .build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, UrlEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocida: " + id));
        repository.save(current.toBuilder()
                .name(name).url(url).description(description)
                .build());
    }

    @Override
    public String id() {
        return id;
    }

    public UrlViewModel load(UrlEntity entity) {
        id = entity.id();
        name = entity.name();
        url = entity.url();
        description = entity.description();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nueva URL";
    }
}
