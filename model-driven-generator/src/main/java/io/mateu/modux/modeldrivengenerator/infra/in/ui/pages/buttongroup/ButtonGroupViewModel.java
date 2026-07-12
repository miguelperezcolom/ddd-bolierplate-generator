package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.buttongroup;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ButtonGroupEntity;
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
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GroupButtonEntity;

/**
 * Grupos de botones: la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ButtonGroupViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("Los botones del grupo: etiqueta y caso de uso que disparan. El resto de destinos (operaciones API, mapeados) y el anidado de grupos se trazan en la vista UI.")
    java.util.List<GroupButtonViewModel> buttons = new java.util.ArrayList<>();

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(new ButtonGroupEntity(id, name, toButtons(java.util.List.of()), java.util.List.of()));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, ButtonGroupEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).buttons(toButtons(current.buttons())).build());
    }

    @Override
    public String id() {
        return id;
    }

    public ButtonGroupViewModel load(ButtonGroupEntity entity) {
        id = entity.id();
        name = entity.name();
        buttons = entity.buttons().stream()
                .map(b -> new GroupButtonViewModel(b.id(), b.label(), b.useCaseId()))
                .collect(java.util.stream.Collectors.toCollection(java.util.ArrayList::new));
        return this;
    }


    /** Persist the rows back, preserving the diagram-owned fields of existing buttons. */
    private java.util.List<GroupButtonEntity> toButtons(java.util.List<GroupButtonEntity> current) {
        var byId = new java.util.HashMap<String, GroupButtonEntity>();
        for (var b : current) byId.put(b.id(), b);
        return (buttons == null ? java.util.List.<GroupButtonViewModel>of() : buttons).stream()
                .map(row -> {
                    var itemId = row.itemId == null || row.itemId.isBlank()
                            ? java.util.UUID.randomUUID().toString() : row.itemId;
                    var prev = byId.get(itemId);
                    return new GroupButtonEntity(itemId, row.label, row.useCaseId,
                            prev == null ? null : prev.apiId(),
                            prev == null ? null : prev.apiOperationId(),
                            prev == null ? null : prev.mappingId());
                })
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
