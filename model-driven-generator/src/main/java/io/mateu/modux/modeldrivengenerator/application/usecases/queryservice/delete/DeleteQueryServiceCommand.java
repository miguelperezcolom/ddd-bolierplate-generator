package io.mateu.modux.modeldrivengenerator.application.usecases.queryservice.delete;

import java.util.List;

public record DeleteQueryServiceCommand(List<String> ids) {
}
