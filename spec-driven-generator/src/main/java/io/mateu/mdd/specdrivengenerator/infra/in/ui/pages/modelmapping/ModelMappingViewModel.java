package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.modelmapping;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelMappingDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModelMappingRuleDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.ModelMappingExpressionData;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.ModelMappingRuleData;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.create.CreateModelMappingCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.create.CreateModelMappingUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.save.SaveModelMappingCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.modelmapping.save.SaveModelMappingUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
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

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ModelMappingViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String sourceModelId;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String targetModelId;

    boolean hasCustomPart;

    List<ModelMappingRuleViewModel> rules = new ArrayList<>();

    final CreateModelMappingUseCase createUseCase;
    final SaveModelMappingUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModelMappingCommand(id, name, sourceModelId, targetModelId,
                hasCustomPart, toRuleData(rules)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModelMappingCommand(id, name, sourceModelId, targetModelId,
                hasCustomPart, toRuleData(rules)));
    }

    @Override
    public String id() {
        return id;
    }

    public ModelMappingViewModel load(ModelMappingDto model) {
        id = model.id();
        name = model.name();
        sourceModelId = model.sourceModelId();
        targetModelId = model.targetModelId();
        hasCustomPart = model.hasCustomPart();
        rules = model.rules() == null ? new ArrayList<>() : model.rules().stream()
                .map(this::toRuleViewModel)
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private ModelMappingRuleViewModel toRuleViewModel(ModelMappingRuleDto r) {
        var vm = new ModelMappingRuleViewModel();
        vm.id = r.id();
        vm.sourceFieldId = r.sourceFieldId();
        vm.targetFieldId = r.targetFieldId();
        vm.expressions = r.expressions() == null ? new ArrayList<>() : r.expressions().stream()
                .map(e -> {
                    var evm = new ModelMappingExpressionViewModel();
                    evm.id = e.id();
                    evm.inputExpression = e.inputExpression();
                    evm.outputExpression = e.outputExpression();
                    return evm;
                })
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return vm;
    }

    private List<ModelMappingRuleData> toRuleData(List<ModelMappingRuleViewModel> rules) {
        if (rules == null) return List.of();
        return rules.stream()
                .map(r -> new ModelMappingRuleData(r.id, r.sourceFieldId, r.targetFieldId,
                        r.expressions == null ? List.of() : r.expressions.stream()
                                .map(e -> new ModelMappingExpressionData(e.id, e.inputExpression, e.outputExpression))
                                .toList()))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New model mapping";
    }
}
