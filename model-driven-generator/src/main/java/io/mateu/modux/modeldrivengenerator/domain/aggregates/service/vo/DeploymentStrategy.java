package io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo;

public enum DeploymentStrategy {
    ROLLING,
    BLUE_GREEN,
    CANARY,
    RECREATE
}
