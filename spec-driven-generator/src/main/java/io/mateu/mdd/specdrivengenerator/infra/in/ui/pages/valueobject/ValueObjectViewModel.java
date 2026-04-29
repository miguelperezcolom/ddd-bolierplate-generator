package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.valueobject;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.valueobject.create.CreateValueObjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.valueobject.create.CreateValueObjectUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.valueobject.save.SaveValueObjectCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.valueobject.save.SaveValueObjectUseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.EnumValue;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.ValueObjectField;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.valueobject.ValueObjectType;
import io.mateu.uidl.annotations.FormLayout;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.data.FieldDataType;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
@FormLayout(columns = 1)
public class ValueObjectViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {
    @GeneratedValue(UUIDValueGenerator.class)
            @Hidden
    String id;
    @NotEmpty String name;
    @NotNull
    ValueObjectType type;
    @Hidden("state['type'] != 'Enum'")
    List<EnumValue> values;
    @Hidden("state['type'] != 'Record'")
    List<ValueObjectField> fields;
    @Hidden("state['type'] != 'Wrapper'")
    FieldDataType dataType;

    final CreateValueObjectUseCase createUseCase;
    final SaveValueObjectUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateValueObjectCommand(
                id,
                name,
                type,
                values,
                fields,
                dataType
        ));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveValueObjectCommand(
                id,
                name,
                type,
                values,
                fields,
                dataType
        ));
    }

    @Override
    public String id() {
        return id;
    }

    public ValueObjectViewModel load(ValueObjectDto model) {
        id = model.id();
        name = model.name();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New value object";
    }
}
