package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayUseCase;
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
public class GatewayViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    final CreateGatewayUseCase createUseCase;
    final SaveGatewayUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateGatewayCommand(id, name));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveGatewayCommand(id, name));
    }

    @Override
    public String id() {
        return id;
    }

    public GatewayViewModel load(GatewayDto model) {
        id = model.id();
        name = model.name();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New gateway";
    }

}
