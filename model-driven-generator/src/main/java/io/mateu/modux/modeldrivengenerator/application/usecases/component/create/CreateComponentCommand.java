package io.mateu.modux.modeldrivengenerator.application.usecases.component.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;

public record CreateComponentCommand(
        String id,
        String name,
        ComponentDataSourceType dataSourceType,
        String gatewayId,
        ComponentPresentationType presentationType,
        String queryServiceId
) {
}
