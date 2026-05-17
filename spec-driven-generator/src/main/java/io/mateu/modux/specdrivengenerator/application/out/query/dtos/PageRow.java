package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;

public record PageRow(String id, String name, String route, PageType type) {
}
