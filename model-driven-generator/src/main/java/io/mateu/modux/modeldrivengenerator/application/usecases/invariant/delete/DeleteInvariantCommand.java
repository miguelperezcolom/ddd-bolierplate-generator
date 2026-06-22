package io.mateu.modux.modeldrivengenerator.application.usecases.invariant.delete;

import java.util.List;

public record DeleteInvariantCommand(List<String> ids) {
}
