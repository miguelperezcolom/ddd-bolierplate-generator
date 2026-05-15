package io.mateu.mdd.specdrivengenerator.application.usecases.project.create;

import java.util.List;

public record CreateProjectCommand(String id, String name, String outputPath, String packageName,
                                   String gitRepository, String database,
                                   String kubernetesClusterUrl, String kubernetesNamespace,
                                   String kubernetesContext, String kubernetesToken,
                                   String kubernetesCertificateAuthorityData,
                                   List<String> serviceIds) {

}
