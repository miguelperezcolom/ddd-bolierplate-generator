package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;

public record ComponentDto(
        String id,
        String name,
        ComponentDataSourceType dataSourceType,
        String queryServiceId,
        String gatewayId,
        ComponentPresentationType presentationType
) {
}
