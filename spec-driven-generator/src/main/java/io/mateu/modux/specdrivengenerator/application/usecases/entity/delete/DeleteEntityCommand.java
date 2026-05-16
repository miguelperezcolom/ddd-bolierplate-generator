package io.mateu.modux.specdrivengenerator.application.usecases.entity.delete;

import java.util.List;

public record DeleteEntityCommand(List<String> ids) {
}
