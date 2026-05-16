package io.mateu.modux.specdrivengenerator.application.usecases.readmodel.delete;

import java.util.List;

public record DeleteReadModelCommand(List<String> ids) {
}
