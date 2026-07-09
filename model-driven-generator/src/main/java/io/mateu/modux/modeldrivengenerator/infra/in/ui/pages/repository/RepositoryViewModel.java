package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.create.CreateRepositoryCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.create.CreateRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.open.OpenRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.save.SaveRepositoryCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.save.SaveRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.repository.vo.RepositoryType;
import io.mateu.uidl.annotations.Action;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Multiline;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class RepositoryViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("Dónde vive el proyecto: una carpeta de esta máquina, o un repositorio git remoto.")
    RepositoryType type = RepositoryType.LOCAL;

    @Hidden("state['type'] != 'LOCAL'")
    @Help("Carpeta local donde viven los ficheros (ruta absoluta, o ~ para tu home).")
    String folder;

    @Hidden("state['type'] != 'GIT'")
    @Help("URL del repositorio git (https o ssh).")
    String gitUrl;

    @Hidden("state['type'] != 'GIT'")
    @Help("Rama de trabajo; en blanco usa la rama por defecto del remoto.")
    String branch;

    @Hidden("state['type'] != 'DATABASE'")
    @Help("URL JDBC (H2 embebida o PostgreSQL). Credenciales por MODUX_DB_USER / MODUX_DB_PASSWORD si no van en la URL.")
    String jdbcUrl;

    @Multiline
    String description;

    final CreateRepositoryUseCase createUseCase;
    final SaveRepositoryUseCase saveUseCase;
    final OpenRepositoryUseCase openUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        bind(httpRequest);
        if (id == null || id.isBlank()) id = java.util.UUID.randomUUID().toString();
        createUseCase.handle(new CreateRepositoryCommand(id, name, type, folder, gitUrl, branch, jdbcUrl, description));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        bind(httpRequest);
        saveUseCase.handle(new SaveRepositoryCommand(id, name, type, folder, gitUrl, branch, jdbcUrl, description));
    }

    private void bind(HttpRequest httpRequest) {
        io.mateu.modux.modeldrivengenerator.infra.in.ui.InitiatorStateBinder.bind(this, httpRequest);
    }

    @Override
    public String id() {
        return id;
    }

    public RepositoryViewModel load(RepositoryDto model) {
        id = model.id();
        name = model.name();
        type = model.type() != null ? RepositoryType.valueOf(model.type()) : RepositoryType.LOCAL;
        folder = model.folder();
        gitUrl = model.gitUrl();
        branch = model.branch();
        jdbcUrl = model.jdbcUrl();
        description = model.description();
        return this;
    }

    /** The repository points at the project: opening loads its store as the working model. */
    @Action
    public String abrirProyecto(HttpRequest httpRequest) {
        var storePath = openUseCase.handle(id);
        return "Proyecto abierto desde " + storePath;
    }

    @Override
    public String toString() {
        return id != null ? name : "Nuevo repositorio";
    }
}
