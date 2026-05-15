package io.mateu.mdd.specdrivengenerator.application.usecases.role.delete;

import java.util.List;

public record DeleteRoleCommand(List<String> ids) {
}
