package io.mateu.mdd.specdrivengenerator.application.usecases.readmodel.delete;

import java.util.List;

public record DeleteReadModelCommand(List<String> ids) {
}
