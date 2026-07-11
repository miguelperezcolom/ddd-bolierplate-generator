package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.contextmap.ContextMapDiagramPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.flow.FlowExpandedPage;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.process.ProcessCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.readmodel.ReadModelCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow.WorkflowCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("Patrones")
public class PatronesMenu {

    @Menu
    ContextMapDiagramPage contextMap;

    @Menu
    FlowCrudOrchestrator flows;

    @Menu
    FlowExpandedPage flowsExpanded;

    @Menu
    ProcessCrudOrchestrator processes;

    @Menu
    WorkflowCrudOrchestrator workflows;

    @Menu
    io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway.WorkflowGatewayCrudOrchestrator workflowGateways;

    @Menu
    ReadModelCrudOrchestrator readModels;

}
