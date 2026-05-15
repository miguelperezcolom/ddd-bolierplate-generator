package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.gateway;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.GatewayDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create.CreateGatewayUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save.SaveGatewayUseCase;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;

import java.util.ArrayList;
import java.util.List;
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

    List<GatewayOperationViewModel> operations = new ArrayList<>();

    final CreateGatewayUseCase createUseCase;
    final SaveGatewayUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateGatewayCommand(id, name, toOperationData(operations)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveGatewayCommand(id, name, toOperationData(operations)));
    }

    @Override
    public String id() {
        return id;
    }

    public GatewayViewModel load(GatewayDto model) {
        id = model.id();
        name = model.name();
        operations = model.operations() == null ? new ArrayList<>() :
                model.operations().stream().map(o -> {
                    var vm = new GatewayOperationViewModel();
                    vm.id = o.id();
                    vm.name = o.name();
                    vm.inputModelId = o.inputModelId();
                    vm.outputModelId = o.outputModelId();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<GatewayOperationData> toOperationData(List<GatewayOperationViewModel> ops) {
        if (ops == null) return List.of();
        return ops.stream()
                .map(o -> new GatewayOperationData(o.id, o.name, o.inputModelId, o.outputModelId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New gateway";
    }

}
