package io.mateu.modux.specdrivengenerator.application.usecases.page.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;

public record CreatePageCommand(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId
) {
}
