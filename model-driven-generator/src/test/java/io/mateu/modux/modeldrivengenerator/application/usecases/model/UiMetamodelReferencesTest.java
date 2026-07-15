package io.mateu.modux.modeldrivengenerator.application.usecases.model;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/** The UI map's new references are seen by the referential-integrity reflection. */
class UiMetamodelReferencesTest {

    @Test
    void menuTreePageIdsAreCollectedRecursively() {
        var leaf = new UiMenuItemEntity("Detalle", null, null, null, "page-detalle", List.of());
        var branch = new UiMenuItemEntity("Reservas", null, null, null, "page-reservas", List.of(leaf));
        var app = new UiAdapterEntity("app-recepcion", "Recepción", "svc-frontoffice",
                "Recepción", "/recepcion", null, List.of(branch));

        var referenced = CatalogReflection.references(app).stream().map(r -> r.id()).toList();
        assertThat(referenced).contains("page-reservas", "page-detalle");
    }

    @Test
    void buttonMappingAndRoleAppsAreReferences() {
        var button = new PageButtonEntity("Guardar", null, "uc-guardar", null, "map-vm-a-request");
        var role = new RoleEntity("role-recepcionista", "Recepcionista",
                List.of(), List.of(), List.of(), List.of(), List.of("app-recepcion"), null);

        assertThat(CatalogReflection.references(button).stream().map(r -> r.id()))
                .contains("uc-guardar", "map-vm-a-request");
        assertThat(CatalogReflection.references(role).stream().map(r -> r.id()))
                .contains("app-recepcion");
    }

    @Test
    void preExistingShapesStillBuild() {
        var item = new UiMenuItemEntity("Inicio", "home", null, "/home");
        assertThat(item.pageId()).isNull();
        assertThat(item.children()).isEmpty();
        var button = new PageButtonEntity("Crear", null, "uc-crear", null);
        assertThat(button.mappingId()).isNull();
        var role = new RoleEntity("r", "R", List.of(), List.of(), List.of(), List.of());
        assertThat(role.uiAdapterIds()).isEmpty();
    }
}
