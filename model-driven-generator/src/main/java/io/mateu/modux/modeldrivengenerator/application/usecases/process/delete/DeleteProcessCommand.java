package io.mateu.modux.modeldrivengenerator.application.usecases.process.delete;

import java.util.List;

public record DeleteProcessCommand(List<String> ids) {
}
