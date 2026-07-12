package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.externalsystem;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ExternalSystemDirection;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ExternalSystemProtocol;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorProjectSupport;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
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

import java.util.List;

/**
 * Sistemas externos: viven DENTRO del proyecto (no son entidades sueltas), así
 * que la ficha edita la lista del proyecto actual. Sus dependencias, tablas,
 * APIs y usos se trazan en el editor gráfico.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ExternalSystemViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Help("Cómo se habla con él: REST, SOAP, GRPC, MESSAGING, FILE, DATABASE…")
    ExternalSystemProtocol protocol;

    @Help("INBOUND: nos llaman · OUTBOUND: los llamamos · BOTH.")
    ExternalSystemDirection direction;

    @Help("Equipo o empresa dueña del sistema — a quién llamar cuando falla.")
    String owner;

    final ModelStore repository;
    final EditorProjectSupport projects;

    @Override
    public String create(HttpRequest httpRequest) {
        var project = projects.owningProject();
        var list = new java.util.ArrayList<>(project.externalSystems());
        list.add(ExternalSystemEntity.builder()
                .id(id).name(name).description(description)
                .protocol(protocol).direction(direction).owner(owner)
                .decisionIds(List.of()).useCases(List.of()).tables(List.of())
                .dependsOnExternalSystemIds(List.of()).dependsOnApiIds(List.of())
                .cqrsExternalSystemIds(List.of()).mcpServers(List.of())
                .apiOperationUses(List.of())
                .build());
        repository.save(EditorProjectSupport.withExternalSystems(project, list));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        var project = projects.owningProject();
        repository.save(EditorProjectSupport.withExternalSystems(project,
                project.externalSystems().stream()
                        .map(x -> x.id().equals(id)
                                ? x.toBuilder().name(name).description(description)
                                        .protocol(protocol).direction(direction).owner(owner)
                                        .build()
                                : x)
                        .toList()));
    }

    @Override
    public String id() {
        return id;
    }

    public ExternalSystemViewModel load(ExternalSystemEntity entity) {
        id = entity.id();
        name = entity.name();
        description = entity.description();
        protocol = entity.protocol();
        direction = entity.direction();
        owner = entity.owner();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo sistema externo";
    }
}
