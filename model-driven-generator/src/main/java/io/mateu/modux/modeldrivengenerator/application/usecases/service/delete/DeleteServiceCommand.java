package io.mateu.modux.modeldrivengenerator.application.usecases.service.delete;

import java.util.List;

public record DeleteServiceCommand(List<String> ids) {
}
