package io.mateu.modux.specdrivengenerator.application.usecases.project.aicomplete;

public record AiCompleteCodeCommand(
        String projectId,
        String outputPath,
        String packageName,
        String apiKey,
        String model
) {}
