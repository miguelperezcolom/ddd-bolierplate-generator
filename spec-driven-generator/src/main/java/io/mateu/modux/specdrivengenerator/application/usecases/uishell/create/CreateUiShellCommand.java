package io.mateu.modux.specdrivengenerator.application.usecases.uishell.create;

import io.mateu.modux.specdrivengenerator.domain.aggregates.uishell.vo.UiShellDeploymentType;

import java.util.List;

public record CreateUiShellCommand(
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
    public CreateUiShellCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
