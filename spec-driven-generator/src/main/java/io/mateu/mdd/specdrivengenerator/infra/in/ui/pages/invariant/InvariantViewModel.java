package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.invariant;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.invariant.InvariantConditionData;
import io.mateu.mdd.specdrivengenerator.application.usecases.invariant.create.CreateInvariantCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.invariant.create.CreateInvariantUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.invariant.save.SaveInvariantCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.invariant.save.SaveInvariantUseCase;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
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
public class InvariantViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Tab
    List<InvariantConditionViewModel> conditions = new ArrayList<>();

    final CreateInvariantUseCase createUseCase;
    final SaveInvariantUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateInvariantCommand(id, name, toConditionData(conditions)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveInvariantCommand(id, name, toConditionData(conditions)));
    }

    @Override
    public String id() {
        return id;
    }

    public InvariantViewModel load(InvariantDto model) {
        id = model.id();
        name = model.name();
        conditions = model.conditions() == null ? new ArrayList<>() : model.conditions().stream().map(c -> {
            var vm = new InvariantConditionViewModel();
            vm.id = c.id();
            vm.expression = c.expression();
            vm.custom = c.custom();
            vm.description = c.description();
            vm.errorMessage = c.errorMessage();
            return vm;
        }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<InvariantConditionData> toConditionData(List<InvariantConditionViewModel> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new InvariantConditionData(c.id, c.expression, c.custom, c.description, c.errorMessage))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New aggregate";
    }
}
