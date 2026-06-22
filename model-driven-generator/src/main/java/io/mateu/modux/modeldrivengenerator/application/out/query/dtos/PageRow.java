package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageType;

public record PageRow(String id, String name, String route, PageType type) {
}
