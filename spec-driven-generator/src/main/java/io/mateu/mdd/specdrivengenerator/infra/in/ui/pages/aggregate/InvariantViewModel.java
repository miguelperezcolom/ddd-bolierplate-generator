package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.aggregate;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.InvariantConditionDto;

import java.util.List;

public record InvariantViewModel(String id, String name, List<InvariantConditionDto> conditions) {
}
