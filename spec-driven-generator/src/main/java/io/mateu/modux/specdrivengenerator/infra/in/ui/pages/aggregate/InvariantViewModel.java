package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.InvariantConditionDto;

import java.util.List;

public record InvariantViewModel(String id, String name, List<InvariantConditionDto> conditions) {
}
