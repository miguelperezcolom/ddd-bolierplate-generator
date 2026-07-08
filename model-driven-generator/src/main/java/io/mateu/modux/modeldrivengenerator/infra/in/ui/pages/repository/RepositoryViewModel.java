package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.repository;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.create.CreateRepositoryCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.create.CreateRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.open.OpenRepositoryUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.save.SaveRepositoryCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.repository.save.SaveRepositoryUseCase;
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

    @Help("Carpeta local donde viven los ficheros (ruta absoluta, o ~ para tu home).")
    String folder;

    @Help("URL del repositorio git (https o ssh). Basta con la carpeta O la URL.")
    String gitUrl;

    @Help("Rama de trabajo cuando hay URL git; en blanco usa la rama por defecto del remoto.")
    String branch;

    @Multiline
    String description;

    final CreateRepositoryUseCase createUseCase;
    final SaveRepositoryUseCase saveUseCase;
    final OpenRepositoryUseCase openUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        bind(httpRequest);
        if (id == null || id.isBlank()) id = java.util.UUID.randomUUID().toString();
        createUseCase.handle(new CreateRepositoryCommand(id, name, folder, gitUrl, branch, description));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        bind(httpRequest);
        saveUseCase.handle(new SaveRepositoryCommand(id, name, folder, gitUrl, branch, description));
    }

    /** The submitted form travels as the action's initiator state, not as bean fields. */
    record FormState(String id, String name, String folder, String gitUrl,
                     String branch, String description) {}

    private void bind(HttpRequest httpRequest) {
        var state = httpRequest.getInitiatorState(FormState.class);
        if (state == null) return;
        id = firstNonBlank(state.id(), id);
        name = firstNonBlank(state.name(), name);
        folder = firstNonBlank(state.folder(), folder);
        gitUrl = firstNonBlank(state.gitUrl(), gitUrl);
        branch = firstNonBlank(state.branch(), branch);
        description = firstNonBlank(state.description(), description);
    }

    private static String firstNonBlank(String value, String fallback) {
        return value != null && !value.isBlank() ? value : fallback;
    }

    @Override
    public String id() {
        return id;
    }

    public RepositoryViewModel load(RepositoryDto model) {
        id = model.id();
        name = model.name();
        folder = model.folder();
        gitUrl = model.gitUrl();
        branch = model.branch();
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
