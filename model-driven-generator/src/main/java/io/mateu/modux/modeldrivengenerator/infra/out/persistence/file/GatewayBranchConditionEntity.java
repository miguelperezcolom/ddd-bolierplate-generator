package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * The condition guarding ONE outgoing branch of an EXCLUSIVE split: the
 * expression that, when true, picks this branch. Intent-first: prose or a
 * formal expression — the workflow engine will consume it later.
 */
public record GatewayBranchConditionEntity(
        String targetId,
        String expression
) {
}
