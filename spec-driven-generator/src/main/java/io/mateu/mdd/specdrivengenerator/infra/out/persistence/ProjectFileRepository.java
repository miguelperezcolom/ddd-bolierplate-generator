package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ProjectRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.Project;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.CacheProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.EmailProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.FileStorageProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.SecretsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.IamProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LlmProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.LoggingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MessageBrokerType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.MetricsProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TracingProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformBackendType;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.TerraformProvider;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ProjectEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectFileRepository implements ProjectRepository {

    final CommonFileRepository repository;

    @Override
    public Optional<Project> findById(ProjectId id) {
        return repository.findById(id.id(), ProjectEntity.class)
                .map(entity -> Project.load(
                        entity.id(),
                        entity.name(),
                        entity.outputPath(),
                        entity.packageName(),
                        entity.gitRepository(),
                        entity.database(),
                        entity.kubernetesClusterUrl(),
                        entity.kubernetesNamespace(),
                        entity.kubernetesContext(),
                        entity.kubernetesToken(),
                        entity.kubernetesCertificateAuthorityData(),
                        entity.terraformProvider(), entity.terraformProviderVersion(),
                        entity.terraformBackendType(),
                        entity.terraformBackendBucket(), entity.terraformBackendRegion(),
                        entity.terraformBackendKey(), entity.terraformWorkspace(),
                        entity.iamProvider(), entity.iamServerUrl(), entity.iamRealm(),
                        entity.iamClientId(), entity.iamClientSecret(), entity.iamAudience(),
                        entity.messageBrokerType(), entity.messageBrokerUrl(),
                        entity.messageBrokerUsername(), entity.messageBrokerPassword(),
                        entity.tracingProvider(), entity.tracingEndpoint(),
                        entity.metricsProvider(), entity.metricsEndpoint(),
                        entity.loggingProvider(), entity.loggingEndpoint(),
                        entity.llmProvider(), entity.llmApiUrl(),
                        entity.llmApiKey(), entity.llmModel(),
                        entity.cacheProvider(), entity.cacheUrl(),
                        entity.cacheUsername(), entity.cachePassword(),
                        entity.fileStorageProvider(), entity.fileStorageBucket(),
                        entity.fileStorageRegion(), entity.fileStorageAccessKey(),
                        entity.fileStorageSecretKey(), entity.fileStorageEndpoint(),
                        entity.emailProvider(), entity.emailHost(), entity.emailPort(),
                        entity.emailUsername(), entity.emailPassword(), entity.emailFrom(),
                        entity.secretsProvider(), entity.secretsEndpoint(), entity.secretsToken(),
                        entity.ingressDomain(), entity.ingressTlsEnabled(), entity.ingressClassName(),
                        entity.serviceIds()));
    }

    @Override
    public Project save(Project entity) {
        repository.save(new ProjectEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getOutputPath().path(),
                entity.getPackageName().packageName(),
                entity.getGitRepository(),
                entity.getDatabase(),
                entity.getKubernetesClusterUrl(),
                entity.getKubernetesNamespace(),
                entity.getKubernetesContext(),
                entity.getKubernetesToken(),
                entity.getKubernetesCertificateAuthorityData(),
                entity.getTerraformProvider(), entity.getTerraformProviderVersion(),
                entity.getTerraformBackendType(),
                entity.getTerraformBackendBucket(), entity.getTerraformBackendRegion(),
                entity.getTerraformBackendKey(), entity.getTerraformWorkspace(),
                entity.getIamProvider(), entity.getIamServerUrl(), entity.getIamRealm(),
                entity.getIamClientId(), entity.getIamClientSecret(), entity.getIamAudience(),
                entity.getMessageBrokerType(), entity.getMessageBrokerUrl(),
                entity.getMessageBrokerUsername(), entity.getMessageBrokerPassword(),
                entity.getTracingProvider(), entity.getTracingEndpoint(),
                entity.getMetricsProvider(), entity.getMetricsEndpoint(),
                entity.getLoggingProvider(), entity.getLoggingEndpoint(),
                entity.getLlmProvider(), entity.getLlmApiUrl(),
                entity.getLlmApiKey(), entity.getLlmModel(),
                entity.getCacheProvider(), entity.getCacheUrl(),
                entity.getCacheUsername(), entity.getCachePassword(),
                entity.getFileStorageProvider(), entity.getFileStorageBucket(),
                entity.getFileStorageRegion(), entity.getFileStorageAccessKey(),
                entity.getFileStorageSecretKey(), entity.getFileStorageEndpoint(),
                entity.getEmailProvider(), entity.getEmailHost(), entity.getEmailPort(),
                entity.getEmailUsername(), entity.getEmailPassword(), entity.getEmailFrom(),
                entity.getSecretsProvider(), entity.getSecretsEndpoint(), entity.getSecretsToken(),
                entity.getIngressDomain(), entity.isIngressTlsEnabled(), entity.getIngressClassName(),
                entity.getServices().stream()
                        .map(ServiceId::id)
                        .toList()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ProjectId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ProjectId::id).toList());
    }
}
