package io.mateu.modux.modeldrivengenerator.infra.in.ui.menu;

import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aiagent.AiAgentCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.mcpgateway.McpGatewayCrudOrchestrator;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.rag.RagCrudOrchestrator;
import io.mateu.uidl.annotations.Menu;
import io.mateu.uidl.annotations.Title;

@Title("IA")
public class IaMenu {

    @Menu
    AiAgentCrudOrchestrator aiAgents;

    @Menu
    RagCrudOrchestrator rags;

    @Menu
    McpGatewayCrudOrchestrator mcpGateways;
}
