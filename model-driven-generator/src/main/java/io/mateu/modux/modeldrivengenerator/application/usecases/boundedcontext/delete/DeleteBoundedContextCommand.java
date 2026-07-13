package io.mateu.modux.modeldrivengenerator.application.usecases.boundedcontext.delete;

import java.util.List;

public record DeleteBoundedContextCommand(List<String> ids) {
}
