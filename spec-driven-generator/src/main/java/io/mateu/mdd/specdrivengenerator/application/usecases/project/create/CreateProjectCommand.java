package io.mateu.mdd.specdrivengenerator.application.usecases.project.create;

import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;

import java.util.List;

public record CreateProjectCommand(String id, String name, String outputPath, String packageName,
                                   String gitRepository, String database,
                                   String kubernetesClusterUrl, String kubernetesNamespace,
                                   String kubernetesContext, String kubernetesToken,
                                   String kubernetesCertificateAuthorityData,
                                   TerraformProvider terraformProvider, String terraformProviderVersion,
                                   TerraformBackendType terraformBackendType,
                                   String terraformBackendBucket, String terraformBackendRegion,
                                   String terraformBackendKey, String terraformWorkspace,
                                   IamProvider iamProvider, String iamServerUrl, String iamRealm,
                                   String iamClientId, String iamClientSecret, String iamAudience,
                                   MessageBrokerType messageBrokerType, String messageBrokerUrl,
                                   String messageBrokerUsername, String messageBrokerPassword,
                                   TracingProvider tracingProvider, String tracingEndpoint,
                                   MetricsProvider metricsProvider, String metricsEndpoint,
                                   LoggingProvider loggingProvider, String loggingEndpoint,
                                   LlmProvider llmProvider, String llmApiUrl,
                                   String llmApiKey, String llmModel,
                                   CacheProvider cacheProvider, String cacheUrl,
                                   String cacheUsername, String cachePassword,
                                   List<String> serviceIds) {

}
