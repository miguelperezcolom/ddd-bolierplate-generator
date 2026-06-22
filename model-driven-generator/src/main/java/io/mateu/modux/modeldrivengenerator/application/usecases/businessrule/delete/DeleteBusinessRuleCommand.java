package io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.delete;

import java.util.List;

public record DeleteBusinessRuleCommand(List<String> ids) {
}
