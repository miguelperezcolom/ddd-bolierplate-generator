package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ProjectDto(String id, String name, String outputPath, String packageName,
                         String gitRepository, String database,
                         String kubernetesClusterUrl, String kubernetesNamespace,
                         String kubernetesContext, String kubernetesToken,
                         String kubernetesCertificateAuthorityData,
                         List<String> serviceIds) {
}
