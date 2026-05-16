package io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo;

public enum DeploymentStrategy {
    ROLLING,
    BLUE_GREEN,
    CANARY,
    RECREATE
}
