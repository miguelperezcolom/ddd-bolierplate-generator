package io.mateu.modux.specdrivengenerator.application.usecases.component.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;

public record CreateComponentCommand(
        String id,
        String name,
        ComponentDataSourceType dataSourceType,
        String queryServiceId,
        String gatewayId,
        ComponentPresentationType presentationType
) {
}
