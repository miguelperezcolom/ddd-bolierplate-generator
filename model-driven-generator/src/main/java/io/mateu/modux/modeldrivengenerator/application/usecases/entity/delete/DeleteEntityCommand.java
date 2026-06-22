package io.mateu.modux.modeldrivengenerator.application.usecases.entity.delete;

import java.util.List;

public record DeleteEntityCommand(List<String> ids) {
}
