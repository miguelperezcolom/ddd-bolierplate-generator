package io.mateu.modux.modeldrivengenerator.application.usecases.role.delete;

import java.util.List;

public record DeleteRoleCommand(List<String> ids) {
}
