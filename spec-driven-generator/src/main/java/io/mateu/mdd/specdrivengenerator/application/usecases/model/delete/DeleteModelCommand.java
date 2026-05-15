package io.mateu.mdd.specdrivengenerator.application.usecases.model.delete;

import java.util.List;

public record DeleteModelCommand(List<String> ids) {
}
