package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;

import java.util.List;

public record PageDto(
        String id,
        String name,
        String route,
        PageType type,
        String aggregateId,
        String modelId,
        List<String> componentIds,
        String listingDataSourceType,
        String listingQueryServiceId,
        String listingGatewayId
) {
    public PageDto {
        if (componentIds == null) componentIds = List.of();
    }
}
