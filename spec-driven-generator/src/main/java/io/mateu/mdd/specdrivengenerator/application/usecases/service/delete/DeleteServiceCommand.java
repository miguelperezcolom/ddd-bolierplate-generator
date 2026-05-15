package io.mateu.mdd.specdrivengenerator.application.usecases.service.delete;

import java.util.List;

public record DeleteServiceCommand(List<String> ids) {
}
