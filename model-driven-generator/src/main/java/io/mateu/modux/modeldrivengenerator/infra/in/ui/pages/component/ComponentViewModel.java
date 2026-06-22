package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.component;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.create.CreateComponentCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.create.CreateComponentUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.save.SaveComponentCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.component.save.SaveComponentUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ReadModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ReadModelIdOptionsSupplier;
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

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ComponentViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    ComponentDataSourceType dataSourceType;

    @Hidden("state['dataSourceType'] != 'QUERY_SERVICE'")
    @Lookup(search = ReadModelIdOptionsSupplier.class, label = ReadModelIdLabelSupplier.class)
    String queryServiceId;

    @Hidden("state['dataSourceType'] != 'GATEWAY'")
    @Lookup(search = GatewayIdOptionsSupplier.class, label = GatewayIdLabelSupplier.class)
    String gatewayId;

    ComponentPresentationType presentationType;

    final CreateComponentUseCase createUseCase;
    final SaveComponentUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateComponentCommand(id, name, dataSourceType, queryServiceId, gatewayId, presentationType));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveComponentCommand(id, name, dataSourceType, queryServiceId, gatewayId, presentationType));
    }

    @Override
    public String id() {
        return id;
    }

    public ComponentViewModel load(ComponentDto model) {
        id = model.id();
        name = model.name();
        dataSourceType = model.dataSourceType();
        queryServiceId = model.queryServiceId();
        gatewayId = model.gatewayId();
        presentationType = model.presentationType();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New component";
    }
}
