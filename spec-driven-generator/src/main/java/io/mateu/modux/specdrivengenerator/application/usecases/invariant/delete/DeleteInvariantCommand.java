package io.mateu.modux.specdrivengenerator.application.usecases.invariant.delete;

import java.util.List;

public record DeleteInvariantCommand(List<String> ids) {
}
