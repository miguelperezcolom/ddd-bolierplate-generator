package io.mateu.modux.specdrivengenerator.application.usecases.project.generatecode;

public record GenerateCodeCommand(String projectId, String outputPath, String packageName, boolean sourceOnly) {
}
