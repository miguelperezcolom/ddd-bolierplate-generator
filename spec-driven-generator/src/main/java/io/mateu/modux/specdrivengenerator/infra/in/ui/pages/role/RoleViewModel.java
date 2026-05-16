package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.role;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.RoleDto;
import io.mateu.modux.specdrivengenerator.application.usecases.role.create.CreateRoleCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.role.create.CreateRoleUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.role.save.SaveRoleCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.role.save.SaveRoleUseCase;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
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

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class RoleViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    List<String> allowedUseCaseIds;

    @Lookup(search = ReadModelIdOptionsSupplier.class, label = ReadModelIdLabelSupplier.class)
    List<String> allowedReadModelIds;

    final CreateRoleUseCase createUseCase;
    final SaveRoleUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateRoleCommand(id, name, allowedUseCaseIds, allowedReadModelIds));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveRoleCommand(id, name, allowedUseCaseIds, allowedReadModelIds));
    }

    @Override
    public String id() {
        return id;
    }

    public RoleViewModel load(RoleDto model) {
        id = model.id();
        name = model.name();
        allowedUseCaseIds = model.allowedUseCaseIds();
        allowedReadModelIds = model.allowedReadModelIds();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New role";
    }
}
