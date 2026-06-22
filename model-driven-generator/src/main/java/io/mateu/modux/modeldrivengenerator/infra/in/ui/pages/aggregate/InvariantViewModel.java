package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantConditionDto;

import java.util.List;

public record InvariantViewModel(String id, String name, List<InvariantConditionDto> conditions) {
}
