package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.uiadapter;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.UiAdapterDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.UiMenuItemData;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.create.CreateUiAdapterCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.create.CreateUiAdapterUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.save.SaveUiAdapterCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.uiadapter.save.SaveUiAdapterUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppVariant;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ServiceIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.MasterDetail;
import io.mateu.uidl.annotations.Tab;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class UiAdapterViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ServiceIdOptionsSupplier.class, label = ServiceIdLabelSupplier.class)
    String serviceId;

    String title;
    String path;
    UiAppVariant appVariant;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<UiMenuItemViewModel> menuItems = new ArrayList<>();

    final CreateUiAdapterUseCase createUseCase;
    final SaveUiAdapterUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateUiAdapterCommand(
                id, name, serviceId, title, path, appVariant,
                toMenuItemData(menuItems)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveUiAdapterCommand(
                id, name, serviceId, title, path, appVariant,
                toMenuItemData(menuItems)));
    }

    @Override
    public String id() {
        return id;
    }

    public UiAdapterViewModel load(UiAdapterDto model) {
        id = model.id();
        name = model.name();
        serviceId = model.serviceId();
        title = model.title();
        path = model.path();
        appVariant = model.appVariant();
        menuItems = model.menuItems() == null ? new ArrayList<>() :
                model.menuItems().stream()
                        .map(m -> new UiMenuItemViewModel(m.label(), m.icon(), m.description(), m.route(), m.pageId()))
                        .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<UiMenuItemData> toMenuItemData(List<UiMenuItemViewModel> items) {
        if (items == null) return List.of();
        return items.stream()
                .map(m -> new UiMenuItemData(m.label(), m.icon(), m.description(), m.route(), m.pageId()))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New UI adapter";
    }
}
