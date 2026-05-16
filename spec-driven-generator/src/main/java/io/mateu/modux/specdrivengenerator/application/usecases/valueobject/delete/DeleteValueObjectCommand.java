package io.mateu.modux.specdrivengenerator.application.usecases.valueobject.delete;

import java.util.List;

public record DeleteValueObjectCommand(List<String> ids) {
}
