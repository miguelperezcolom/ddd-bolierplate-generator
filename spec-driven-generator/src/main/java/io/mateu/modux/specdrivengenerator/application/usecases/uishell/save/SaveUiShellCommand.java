package io.mateu.modux.specdrivengenerator.application.usecases.uishell.save;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellDeploymentType;

import java.util.List;

public record SaveUiShellCommand(
        String id,
        String name,
        String title,
        String appVariant,
        List<String> serviceIds,
        String url,
        UiShellDeploymentType deploymentType,
        String cdnProvider,
        String cdnSiteId,
        String bucketProvider,
        String bucketName,
        String bucketRegion,
        String deploymentServiceId
) {
    public SaveUiShellCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
