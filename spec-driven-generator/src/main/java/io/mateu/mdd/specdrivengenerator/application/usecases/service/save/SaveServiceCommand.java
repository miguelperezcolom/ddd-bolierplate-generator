package io.mateu.mdd.specdrivengenerator.application.usecases.service.save;

import java.util.List;

public record SaveServiceCommand(String id, String name, String gitRepository, List<String> moduleIds) {

    public SaveServiceCommand {
        if (moduleIds == null) moduleIds = List.of();
    }
}
