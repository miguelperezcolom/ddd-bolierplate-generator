package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

import java.util.List;

public record UiShellEntity(
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
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
