package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.decision;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.create.CreateDecisionCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.create.CreateDecisionUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.save.SaveDecisionCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.decision.save.SaveDecisionUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Multiline;
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
public class DecisionViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Multiline
    @Help("What was decided.")
    String decision;

    @Multiline
    @Help("Why — trade-offs and motivation.")
    String rationale;

    DecisionStatus status;

    @Help("Pointer to the source document/section, e.g. 'hla_booking_v5.md §2 D4'.")
    String source;

    final CreateDecisionUseCase createUseCase;
    final SaveDecisionUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateDecisionCommand(id, name, decision, rationale, status, source));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveDecisionCommand(id, name, decision, rationale, status, source));
    }

    @Override
    public String id() {
        return id;
    }

    public DecisionViewModel load(DecisionDto model) {
        id = model.id();
        name = model.name();
        decision = model.decision();
        rationale = model.rationale();
        status = model.status();
        source = model.source();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New decision";
    }
}
