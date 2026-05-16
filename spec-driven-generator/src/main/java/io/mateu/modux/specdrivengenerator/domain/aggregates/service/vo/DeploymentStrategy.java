package io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo;

public enum DeploymentStrategy {
    ROLLING,
    BLUE_GREEN,
    CANARY,
    RECREATE
}
