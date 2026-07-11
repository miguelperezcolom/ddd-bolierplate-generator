package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow;

/** One branch of an EXCLUSIVE split of THIS workflow: gateway, target and condition. */
public class WorkflowBranchConditionViewModel {

    String gatewayId;
    String gateway;
    String targetId;
    String expression;

    public WorkflowBranchConditionViewModel() {
    }

    public WorkflowBranchConditionViewModel(String gatewayId, String gateway,
                                            String targetId, String expression) {
        this.gatewayId = gatewayId;
        this.gateway = gateway;
        this.targetId = targetId;
        this.expression = expression;
    }
}
