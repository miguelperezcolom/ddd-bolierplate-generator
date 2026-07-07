package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.Workflow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.workflow.vo.WorkflowId;

public interface WorkflowRepository extends Repository<Workflow, WorkflowId> {
}
