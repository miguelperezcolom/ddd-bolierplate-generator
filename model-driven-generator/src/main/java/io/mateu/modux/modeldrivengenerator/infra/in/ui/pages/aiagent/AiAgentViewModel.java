package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aiagent;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
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
 * Agentes IA: la ficha edita la INTENCIÓN (nombre y campos escalares); los
 * cableados con otros elementos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class AiAgentViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Help("Agente de OTRO: entra por gateways MCP, nunca toca los internos directamente.")
    boolean external;

    final ModelStore repository;

    @Override
    public String create(HttpRequest httpRequest) {
        repository.save(AiAgentEntity.builder().id(id).name(name)
                .description(description).external(external)
                .allowedUseCaseIds(java.util.List.of())
                .allowedExternalUseCaseIds(java.util.List.of())
                .ragIds(java.util.List.of())
                .allowedMcpServerIds(java.util.List.of())
                .allowedApiOperationIds(java.util.List.of())
                .allowedQueryServiceIds(java.util.List.of())
                .delegateAgentIds(java.util.List.of())
                .mcpGatewayIds(java.util.List.of())
                .reactsToEventIds(java.util.List.of())
                .allowedApiIds(java.util.List.of())
                .build());
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var current = repository.findById(id, AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Desconocido: " + id));
        repository.save(current.toBuilder().name(name).description(description)
                .external(external).build());
    }

    @Override
    public String id() {
        return id;
    }

    public AiAgentViewModel load(AiAgentEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        external = entity.external();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo";
    }
}
