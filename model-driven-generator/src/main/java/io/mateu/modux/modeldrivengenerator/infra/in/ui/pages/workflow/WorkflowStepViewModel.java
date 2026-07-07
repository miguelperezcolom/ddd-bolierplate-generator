package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

public class WorkflowStepViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    @Help("Event the workflow emits to start this step's task. Defaults to Start<Name>.")
    String emittedEventName;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    @Help("Use case started in its bounded context when the step's event arrives.")
    String targetUseCaseId;

    @Help("Event that signals the task finished. Defaults to <Name>Completed.")
    String completionEventName;

    @Help("Steps this one depends on (dependency graph). Empty = starts with the workflow trigger.")
    List<String> dependsOnStepIds = new ArrayList<>();

    String description;
}
