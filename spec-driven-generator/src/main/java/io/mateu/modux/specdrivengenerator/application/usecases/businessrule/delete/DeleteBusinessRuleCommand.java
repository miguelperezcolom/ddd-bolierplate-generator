package io.mateu.modux.specdrivengenerator.application.usecases.businessrule.delete;

import java.util.List;

public record DeleteBusinessRuleCommand(List<String> ids) {
}
