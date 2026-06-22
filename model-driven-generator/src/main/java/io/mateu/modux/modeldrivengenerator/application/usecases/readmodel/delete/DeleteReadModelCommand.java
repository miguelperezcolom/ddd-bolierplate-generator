package io.mateu.modux.modeldrivengenerator.application.usecases.readmodel.delete;

import java.util.List;

public record DeleteReadModelCommand(List<String> ids) {
}
