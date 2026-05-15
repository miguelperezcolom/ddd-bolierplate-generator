package io.mateu.mdd.specdrivengenerator.application.usecases.service.create;

import java.util.List;

public record CreateServiceCommand(String id, String name, String gitRepository, String database, List<String> moduleIds) {
}
