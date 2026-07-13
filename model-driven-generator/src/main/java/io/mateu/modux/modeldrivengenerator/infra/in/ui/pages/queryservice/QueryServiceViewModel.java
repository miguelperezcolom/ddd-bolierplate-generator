package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.queryservice;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.QueryServiceDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.QueryOperationData;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.create.CreateQueryServiceCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.create.CreateQueryServiceUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.save.SaveQueryServiceCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.save.SaveQueryServiceUseCase;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.BoundedContextIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.Tab;

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
public class QueryServiceViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = BoundedContextIdOptionsSupplier.class, label = BoundedContextIdLabelSupplier.class)
    String boundedContextId;

    String description;

    @Tab("Operations")
    List<QueryOperationViewModel> operations = new ArrayList<>();

    final CreateQueryServiceUseCase createUseCase;
    final SaveQueryServiceUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateQueryServiceCommand(id, name, boundedContextId, description,
                toOperationData(operations)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveQueryServiceCommand(id, name, boundedContextId, description,
                toOperationData(operations)));
    }

    @Override
    public String id() {
        return id;
    }

    public QueryServiceViewModel load(QueryServiceDto model) {
        id = model.id();
        name = model.name();
        boundedContextId = model.boundedContextId();
        description = model.description();
        operations = model.operations() == null ? new ArrayList<>() :
                model.operations().stream().map(o -> {
                    var vm = new QueryOperationViewModel();
                    vm.id = o.id();
                    vm.name = o.name();
                    vm.description = o.description();
                    vm.inputModelId = o.inputModelId();
                    vm.outputModelId = o.outputModelId();
                    vm.cardinality = o.cardinality();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<QueryOperationData> toOperationData(List<QueryOperationViewModel> ops) {
        if (ops == null) return List.of();
        return ops.stream()
                .map(o -> new QueryOperationData(o.id, o.name, o.description,
                        o.inputModelId, o.outputModelId, o.cardinality))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New query service";
    }

}
