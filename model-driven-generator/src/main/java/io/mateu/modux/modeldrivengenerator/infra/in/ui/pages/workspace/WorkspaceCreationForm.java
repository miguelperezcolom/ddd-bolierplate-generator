package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workspace;

import io.mateu.modux.modeldrivengenerator.application.usecases.workspace.CreateWorkspaceElementCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.workspace.CreateWorkspaceElementUseCase;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ProjectIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ProjectIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdOptionsSupplier;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.HttpRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * "New element" from the workspace tree: pick the kind, give it an id and a name, and anchor it to
 * its owner (boundedContext / service / project, depending on the kind). A skeleton element is created and
 * appears in the tree immediately; details are filled in through the element's own editor.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
public class WorkspaceCreationForm implements CrudCreationForm<String> {

    @NotNull
    @Help("What to create. BoundedContext-scoped kinds need an owner boundedContext; GATEWAY and BOUNDED_CONTEXT an owner service; SERVICE an owner project.")
    WorkspaceElementKind kind;

    @NotEmpty
    @Help("Unique id across the whole model (kebab-case recommended), e.g. 'reserva' or 'svc-reservas'.")
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    @Help("Owner boundedContext (for boundedContext-scoped kinds).")
    String boundedContextId;

    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    @Help("Owner service (for GATEWAY and BOUNDED_CONTEXT).")
    String serviceId;

    @Lookup(search = ProjectIdOptionsSupplier.class, label = ProjectIdLabelSupplier.class)
    @Help("Owner project (for SERVICE).")
    String projectId;

    final CreateWorkspaceElementUseCase createUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        var parentId = parentIdFor(kind);
        Map<String, String> elementRefs = new HashMap<>();
        if (kind.ownRefField() != null && parentId != null) {
            elementRefs.put(kind.ownRefField(), parentId);
        }
        var attachToList = kind.parentListField() != null && parentId != null;
        createUseCase.handle(new CreateWorkspaceElementCommand(
                kind.typeName(), id, name, elementRefs,
                attachToList ? kind.parentTypeName() : null,
                attachToList ? parentId : null,
                kind.parentListField()));
        return id;
    }

    private String parentIdFor(WorkspaceElementKind kind) {
        var parentId = switch (kind.scope()) {
            case BOUNDED_CONTEXT -> boundedContextId;
            case SERVICE -> serviceId;
            case PROJECT -> projectId;
            case GLOBAL -> null;
        };
        if (kind.scope() != WorkspaceElementKind.Scope.GLOBAL && (parentId == null || parentId.isBlank())) {
            throw new IllegalArgumentException("A " + kind + " needs an owner "
                    + kind.scope().name().toLowerCase() + " — select it in the form.");
        }
        return parentId;
    }

    @Override
    public String toString() {
        return "New element";
    }
}
