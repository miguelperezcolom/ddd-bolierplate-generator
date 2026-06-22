package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record UiShellDto(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds,
        String url,
        String deploymentType,
        String cdnProvider,
        String cdnSiteId,
        String bucketProvider,
        String bucketName,
        String bucketRegion,
        String deploymentServiceId,
        String designSystem
) {
    public UiShellDto {
        if (serviceIds == null) serviceIds = List.of();
    }
}
