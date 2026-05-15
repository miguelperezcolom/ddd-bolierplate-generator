package io.mateu.mdd.specdrivengenerator.application.usecases.project.save;

import java.util.List;

public record SaveProjectCommand(String id, String name, String outputPath, String packageName, String gitRepository, List<String> serviceIds) {

    public SaveProjectCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
