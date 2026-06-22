package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;

public record ComponentDto(
        String id,
        String name,
        ComponentDataSourceType dataSourceType,
        String gatewayId,
        ComponentPresentationType presentationType,
        String queryServiceId
) {
}
