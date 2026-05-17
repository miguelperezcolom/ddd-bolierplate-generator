package io.mateu.modux.specdrivengenerator.application.usecases.page.save;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageListingDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;

import java.util.List;

public record SavePageCommand(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId,
        List<String> componentIds,
        PageListingDataSourceType listingDataSourceType,
        String listingQueryServiceId,
        String listingGatewayId
) {
    public SavePageCommand {
        if (componentIds == null) componentIds = List.of();
    }
}
