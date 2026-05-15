package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.usecase;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.create.CreateUseCaseUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.usecase.save.SaveUseCaseUseCase;
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
public class UseCaseViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    boolean exposedAsRest;
    boolean exposedAsGrpc;
    boolean exposedAsMcp;
    boolean exposedAsAsync;
    boolean exposedAsUi;

    final CreateUseCaseUseCase createUseCase;
    final SaveUseCaseUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateUseCaseCommand(id, name,
                exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUseCaseCommand(id, name,
                exposedAsRest, exposedAsGrpc, exposedAsMcp, exposedAsAsync, exposedAsUi));
    }

    @Override
    public String id() {
        return id;
    }

    public UseCaseViewModel load(UseCaseDto model) {
        id = model.id();
        name = model.name();
        exposedAsRest = model.exposedAsRest();
        exposedAsGrpc = model.exposedAsGrpc();
        exposedAsMcp = model.exposedAsMcp();
        exposedAsAsync = model.exposedAsAsync();
        exposedAsUi = model.exposedAsUi();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New use case";
    }

}
