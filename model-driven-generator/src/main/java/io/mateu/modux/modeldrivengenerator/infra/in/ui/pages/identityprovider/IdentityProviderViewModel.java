package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.identityprovider;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IdentityProviderEntity;
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
 * Proveedores de identidad: la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class IdentityProviderViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("CORPORATE (empleados), B2C (clientes), SOCIAL, PARTNER.")
    IdpType type;

    @Help("El issuer URI que llevan los tokens (OIDC iss).")
    String issuer;

    String description;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(new IdentityProviderEntity(id, name,
                type == null ? null : type.name(), issuer, null, description, null));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, IdentityProviderEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name)
                .type(type == null ? null : type.name()).issuer(issuer)
                .description(description).build());
    }

    @Override
    public String id() {
        return id;
    }

    public IdentityProviderViewModel load(IdentityProviderEntity entity) {
        id = entity.id();
        name = entity.name();
        type = entity.type() == null ? null : IdpType.valueOf(entity.type());
        issuer = entity.issuer();
        description = entity.description();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
