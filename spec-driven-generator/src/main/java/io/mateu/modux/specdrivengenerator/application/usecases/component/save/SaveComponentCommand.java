package io.mateu.modux.specdrivengenerator.application.usecases.component.save;

import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.component.vo.ComponentPresentationType;

public record SaveComponentCommand(
        String id,
        String name,
        ComponentDataSourceType dataSourceType,
        String queryServiceId,
        String gatewayId,
        ComponentPresentationType presentationType
) {
}
