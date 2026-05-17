package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.uishell;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UiShellDto;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.create.CreateUiShellCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.create.CreateUiShellUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.save.SaveUiShellCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.uishell.save.SaveUiShellUseCase;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
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
public class UiShellViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String title;

    String appVariant;

    final CreateUiShellUseCase createUseCase;
    final SaveUiShellUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateUiShellCommand(id, name, title, appVariant));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUiShellCommand(id, name, title, appVariant));
    }

    @Override
    public String id() {
        return id;
    }

    public UiShellViewModel load(UiShellDto model) {
        id = model.id();
        name = model.name();
        title = model.title();
        appVariant = model.appVariant();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New UI shell";
    }
}
