package io.mateu.modux.modeldrivengenerator.application.usecases.module.delete;

import java.util.List;

public record DeleteModuleCommand(List<String> ids) {
}
