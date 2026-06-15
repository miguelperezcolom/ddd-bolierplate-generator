package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.enumdefinition;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.EnumDefinitionDto;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.EnumDefinitionValueData;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.create.CreateEnumDefinitionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.create.CreateEnumDefinitionUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.save.SaveEnumDefinitionCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.enumdefinition.save.SaveEnumDefinitionUseCase;
import io.mateu.uidl.annotations.DetailFormCustomisation;
import io.mateu.uidl.annotations.FormLayout;
import io.mateu.uidl.data.FormPosition;
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
import java.util.stream.Collectors;

@Service
@Scope("prototype")
@RequiredArgsConstructor
@FormLayout(columns = 1)
public class EnumDefinitionViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @NotEmpty
    String id;

    @DetailFormCustomisation(position = FormPosition.modal)
    List<EnumDefinitionValueViewModel> values = new ArrayList<>();

    final CreateEnumDefinitionUseCase createUseCase;
    final SaveEnumDefinitionUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateEnumDefinitionCommand(id, toValueData(values)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveEnumDefinitionCommand(id, toValueData(values)));
    }

    @Override
    public String id() {
        return id;
    }

    public EnumDefinitionViewModel load(EnumDefinitionDto dto) {
        id = dto.id();
        values = dto.values() == null ? new ArrayList<>() :
                dto.values().stream().map(v -> {
                    var vm = new EnumDefinitionValueViewModel();
                    vm.id = v.id();
                    vm.name = v.name();
                    return vm;
                }).collect(Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<EnumDefinitionValueData> toValueData(List<EnumDefinitionValueViewModel> values) {
        if (values == null) return List.of();
        return values.stream().map(v -> new EnumDefinitionValueData(v.id, v.name)).toList();
    }

    @Override
    public String toString() {
        return id != null ? id : "New enum";
    }
}
