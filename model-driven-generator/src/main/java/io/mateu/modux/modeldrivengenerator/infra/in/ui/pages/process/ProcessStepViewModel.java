package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.process;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import jakarta.validation.constraints.NotEmpty;

public class ProcessStepViewModel {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    ProcessStepType type;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    @Help("AUTOMATED: the use case the system runs. HUMAN: run when the person completes the task.")
    String useCaseId;

    @Help("HUMAN steps: role whose worklist receives the task.")
    String roleId;

    @Help("ISO-8601 duration, e.g. PT48H.")
    String deadline;

    @Help("Role notified when the deadline expires.")
    String escalationRoleId;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    @Help("Use case that undoes this step when the process fails later (saga compensation).")
    String compensationUseCaseId;

    String description;
}
