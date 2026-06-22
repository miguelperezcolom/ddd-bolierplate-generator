package io.mateu.modux.modeldrivengenerator.application.usecases.project.aicomplete;

public record AiCompleteCodeCommand(
        String projectId,
        String outputPath,
        String packageName,
        String apiKey,
        String model
) {}
