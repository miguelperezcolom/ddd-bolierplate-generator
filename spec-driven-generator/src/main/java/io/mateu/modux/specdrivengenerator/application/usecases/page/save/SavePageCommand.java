package io.mateu.modux.specdrivengenerator.application.usecases.page.save;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;

public record SavePageCommand(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId
) {
}
