package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflowgateway;

/** One outgoing branch of an EXCLUSIVE split: the target and the condition guarding it. */
public class BranchConditionViewModel {

    String targetId;
    String expression;

    public BranchConditionViewModel() {
    }

    public BranchConditionViewModel(String targetId, String expression) {
        this.targetId = targetId;
        this.expression = expression;
    }
}
