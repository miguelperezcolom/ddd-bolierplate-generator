package io.mateu.modux.modeldrivengenerator.application.usecases.project.deploy;

/**
 * Deploy the project's generated services to the selected environment (or the
 * project's first one; sensible defaults when none is declared).
 */
public record DeployProjectCommand(String projectId, String environment) {
}
