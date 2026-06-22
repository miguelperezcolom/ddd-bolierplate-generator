package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ProjectRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.Project;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.ProjectEnvironmentConfig;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelation;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ContextMapRelationType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectEnvironment;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEnvironmentConfigEntity;
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
                        entity.dbMigrationTool(),
                        entity.terraformProvider(), entity.terraformProviderVersion(),
                        entity.terraformBackendType(),
                        entity.iamProvider(),
                        entity.messageBrokerType(),
                        entity.tracingProvider(),
                        entity.metricsProvider(),
                        entity.loggingProvider(),
                        entity.llmProvider(),
                        entity.cacheProvider(),
                        entity.fileStorageProvider(),
                        entity.emailProvider(),
                        entity.secretsProvider(),
                        entity.cicdProvider(),
                        entity.environments() == null ? List.<ProjectEnvironmentConfig>of() :
                                entity.environments().stream().map(e -> new ProjectEnvironmentConfig(
                                        e.environment() != null ? ProjectEnvironment.valueOf(e.environment()) : null,
                                        e.kubernetesClusterUrl(),
                                        e.kubernetesNamespace(),
                                        e.kubernetesContext(),
                                        e.kubernetesToken(),
                                        e.kubernetesCertificateAuthorityData(),
                                        e.terraformBackendBucket(),
                                        e.terraformBackendRegion(),
                                        e.terraformBackendKey(),
                                        e.terraformWorkspace(),
                                        e.iamServerUrl(),
                                        e.iamRealm(),
                                        e.iamClientId(),
                                        e.iamClientSecret(),
                                        e.iamAudience(),
                                        e.messageBrokerUrl(),
                                        e.messageBrokerUsername(),
                                        e.messageBrokerPassword(),
                                        e.tracingEndpoint(),
                                        e.metricsEndpoint(),
                                        e.loggingEndpoint(),
                                        e.llmApiUrl(),
                                        e.llmApiKey(),
                                        e.llmModel(),
                                        e.cacheUrl(),
                                        e.cacheUsername(),
                                        e.cachePassword(),
                                        e.fileStorageBucket(),
                                        e.fileStorageRegion(),
                                        e.fileStorageAccessKey(),
                                        e.fileStorageSecretKey(),
                                        e.fileStorageEndpoint(),
                                        e.emailHost(),
                                        e.emailPort(),
                                        e.emailUsername(),
                                        e.emailPassword(),
                                        e.emailFrom(),
                                        e.secretsEndpoint(),
                                        e.secretsToken(),
                                        e.ingressDomain(),
                                        e.ingressTlsEnabled(),
                                        e.ingressClassName()
                                )).toList(),
                        entity.serviceIds(),
                        entity.contextMap() == null ? List.<ContextMapRelation>of() : entity.contextMap().stream()
                                .map(r -> new ContextMapRelation(r.id(), r.name(), r.sourceModuleId(), r.targetModuleId(),
                                        r.type() != null ? ContextMapRelationType.valueOf(r.type()) : null, r.description()))
                                .toList()));
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
                entity.getDbMigrationTool(),
                entity.getTerraformProvider(), entity.getTerraformProviderVersion(),
                entity.getTerraformBackendType(),
                entity.getIamProvider(),
                entity.getMessageBrokerType(),
                entity.getTracingProvider(),
                entity.getMetricsProvider(),
                entity.getLoggingProvider(),
                entity.getLlmProvider(),
                entity.getCacheProvider(),
                entity.getFileStorageProvider(),
                entity.getEmailProvider(),
                entity.getSecretsProvider(),
                entity.getCicdProvider() != null ? entity.getCicdProvider().name() : null,
                entity.getEnvironments() == null ? List.<ProjectEnvironmentConfigEntity>of() :
                        entity.getEnvironments().stream().map(e -> new ProjectEnvironmentConfigEntity(
                                e.environment() != null ? e.environment().name() : null,
                                e.kubernetesClusterUrl(),
                                e.kubernetesNamespace(),
                                e.kubernetesContext(),
                                e.kubernetesToken(),
                                e.kubernetesCertificateAuthorityData(),
                                e.terraformBackendBucket(),
                                e.terraformBackendRegion(),
                                e.terraformBackendKey(),
                                e.terraformWorkspace(),
                                e.iamServerUrl(),
                                e.iamRealm(),
                                e.iamClientId(),
                                e.iamClientSecret(),
                                e.iamAudience(),
                                e.messageBrokerUrl(),
                                e.messageBrokerUsername(),
                                e.messageBrokerPassword(),
                                e.tracingEndpoint(),
                                e.metricsEndpoint(),
                                e.loggingEndpoint(),
                                e.llmApiUrl(),
                                e.llmApiKey(),
                                e.llmModel(),
                                e.cacheUrl(),
                                e.cacheUsername(),
                                e.cachePassword(),
                                e.fileStorageBucket(),
                                e.fileStorageRegion(),
                                e.fileStorageAccessKey(),
                                e.fileStorageSecretKey(),
                                e.fileStorageEndpoint(),
                                e.emailHost(),
                                e.emailPort(),
                                e.emailUsername(),
                                e.emailPassword(),
                                e.emailFrom(),
                                e.secretsEndpoint(),
                                e.secretsToken(),
                                e.ingressDomain(),
                                e.ingressTlsEnabled(),
                                e.ingressClassName()
                        )).toList(),
                entity.getServices().stream()
                        .map(s -> s.id())
                        .toList(),
                entity.getContextMap() == null ? List.<ContextMapRelationEntity>of() : entity.getContextMap().stream()
                        .map(r -> new ContextMapRelationEntity(r.id(), r.name(), r.sourceModuleId(), r.targetModuleId(),
                                r.type() != null ? r.type().name() : null, r.description()))
                        .toList()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ProjectId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ProjectId::id).toList(), ProjectEntity.class);
    }
}
