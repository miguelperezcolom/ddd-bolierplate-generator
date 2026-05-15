package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ProjectEntity(
        String id,
        String name,
        String outputPath,
        String packageName,
        String gitRepository,
        String database,
        String kubernetesClusterUrl,
        String kubernetesNamespace,
        String kubernetesContext,
        String kubernetesToken,
        String kubernetesCertificateAuthorityData,
        TerraformProvider terraformProvider,
        String terraformProviderVersion,
        TerraformBackendType terraformBackendType,
        String terraformBackendBucket,
        String terraformBackendRegion,
        String terraformBackendKey,
        String terraformWorkspace,
        IamProvider iamProvider,
        String iamServerUrl,
        String iamRealm,
        String iamClientId,
        String iamClientSecret,
        String iamAudience,
        List<String> serviceIds
) implements Identifiable {

    public ProjectEntity {
        if (serviceIds == null) serviceIds = List.of();
    }

}
