package io.mateu.modux.modeldrivengenerator.application.usecases.uishell.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellDeploymentType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.uishell.vo.UiShellDesignSystem;

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
        String deploymentServiceId,
        UiShellDesignSystem designSystem
) {
    public SaveUiShellCommand {
        if (serviceIds == null) serviceIds = List.of();
    }
}
