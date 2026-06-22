package io.mateu.modux.modeldrivengenerator.application.usecases.page.delete;

import java.util.List;

public record DeletePageCommand(List<String> ids) {
}
