package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.create.CreateModelCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.create.CreateModelUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.save.SaveModelCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.save.SaveModelUseCase;
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
public class ModelViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    final CreateModelUseCase createUseCase;
    final SaveModelUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModelCommand(id, name));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModelCommand(id, name));
    }

    @Override
    public String id() {
        return id;
    }

    public ModelViewModel load(ModelDto model) {
        id = model.id();
        name = model.name();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New model";
    }

}
