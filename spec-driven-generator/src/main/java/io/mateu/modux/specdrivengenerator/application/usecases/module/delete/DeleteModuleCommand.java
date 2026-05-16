package io.mateu.modux.specdrivengenerator.application.usecases.module.delete;

import java.util.List;

public record DeleteModuleCommand(List<String> ids) {
}
