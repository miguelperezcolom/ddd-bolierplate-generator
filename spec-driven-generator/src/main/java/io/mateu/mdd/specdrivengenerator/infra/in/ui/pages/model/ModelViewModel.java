package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.model;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelFieldData;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelFieldValidationData;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.ModelValidationData;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.create.CreateModelCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.create.CreateModelUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.save.SaveModelCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.model.save.SaveModelUseCase;
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
public class ModelViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    List<ModelFieldViewModel> fields = new ArrayList<>();

    List<ModelValidationViewModel> validations = new ArrayList<>();

    final CreateModelUseCase createUseCase;
    final SaveModelUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModelCommand(id, name, toFieldData(fields), toValidationData(validations)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModelCommand(id, name, toFieldData(fields), toValidationData(validations)));
    }

    @Override
    public String id() {
        return id;
    }

    public ModelViewModel load(ModelDto model) {
        id = model.id();
        name = model.name();
        fields = model.fields() == null ? new ArrayList<>() :
                model.fields().stream().map(f -> {
                    var vm = new ModelFieldViewModel();
                    vm.id = f.id();
                    vm.name = f.name();
                    vm.basicType = f.basicType();
                    vm.type = f.type();
                    vm.modelId = f.modelId();
                    vm.validations = f.validations() == null ? new ArrayList<>() :
                            f.validations().stream().map(v -> {
                                var vvm = new ModelFieldValidationViewModel();
                                vvm.id = v.id();
                                vvm.type = v.type();
                                vvm.params = v.params();
                                return vvm;
                            }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        validations = model.validations() == null ? new ArrayList<>() :
                model.validations().stream().map(v -> {
                    var vm = new ModelValidationViewModel();
                    vm.id = v.id();
                    vm.condition = v.condition();
                    vm.fieldId = v.fieldId();
                    vm.message = v.message();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<ModelFieldData> toFieldData(List<ModelFieldViewModel> fields) {
        if (fields == null) return List.of();
        return fields.stream()
                .map(f -> new ModelFieldData(f.id, f.name, f.basicType, f.type, f.modelId,
                        f.validations == null ? List.of() :
                                f.validations.stream()
                                        .map(v -> new ModelFieldValidationData(v.id, v.type, v.params))
                                        .toList()))
                .toList();
    }

    private List<ModelValidationData> toValidationData(List<ModelValidationViewModel> validations) {
        if (validations == null) return List.of();
        return validations.stream()
                .map(v -> new ModelValidationData(v.id, v.condition, v.fieldId, v.message))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New model";
    }

}
