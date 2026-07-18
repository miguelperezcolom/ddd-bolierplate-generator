package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.interaction;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionTriggerKind;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionEntity;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Multiline;
import io.mateu.uidl.annotations.ReadOnly;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

/**
 * The header of a sequence scenario (interaction): name, description and what kicks it off.
 * The messages themselves are drawn on the graphical surface — this form never touches them.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class InteractionViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    static final String MESSAGES_NOTE = "Los mensajes se editan en la superficie gráfica (vista Secuencias del editor).";

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Multiline
    @Help("Qué cuenta esta secuencia, de principio a fin.")
    String description;

    @Help("Qué dispara la secuencia: un actor, una operación de API, un evento o un caso de uso.")
    InteractionTriggerKind triggerKind;

    @Help("Id del elemento que la dispara (o el NOMBRE del evento si el tipo es EVENT). Puede quedar vacío.")
    String triggerRef;

    @ReadOnly
    String messagesNote = MESSAGES_NOTE;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(InteractionEntity.builder()
                .id(id).name(name).description(description)
                .triggerKind(triggerKind).triggerRef(triggerRef)
                .build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, InteractionEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocida: " + id));
        // the messages are owned by the graphical surface: a header save keeps them verbatim
        repository.save(current.toBuilder()
                .name(name).description(description)
                .triggerKind(triggerKind).triggerRef(triggerRef)
                .build());
    }

    @Override
    public String id() {
        return id;
    }

    public InteractionViewModel load(InteractionEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        triggerKind = entity.triggerKind();
        triggerRef = entity.triggerRef();
        messagesNote = MESSAGES_NOTE;
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nueva secuencia";
    }
}
