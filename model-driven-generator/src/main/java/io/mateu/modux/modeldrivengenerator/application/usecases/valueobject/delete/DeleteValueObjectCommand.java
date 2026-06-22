package io.mateu.modux.modeldrivengenerator.application.usecases.valueobject.delete;

import java.util.List;

public record DeleteValueObjectCommand(List<String> ids) {
}
