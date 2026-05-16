package io.mateu.modux.specdrivengenerator.application.usecases.role.delete;

import java.util.List;

public record DeleteRoleCommand(List<String> ids) {
}
