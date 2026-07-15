package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ModuleId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.Service;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EnvVarEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceFileRepository implements ServiceRepository {

    final ModelStore repository;

    @Override
    public Optional<Service> findById(ServiceId id) {
        return repository.findById(id.id(), ServiceEntity.class)
                .map(entity -> Service.load(entity.id(), entity.name(), entity.gitRepository(), entity.dockerImageRegistry(), entity.dockerImageName(), entity.port(), entity.contextPath(), entity.database(),
                        entity.dbMigrationTool(), entity.kubernetesReplicas(), entity.kubernetesCpuRequest(), entity.kubernetesCpuLimit(),
                        entity.kubernetesMemoryRequest(), entity.kubernetesMemoryLimit(),
                        entity.kubernetesHpaEnabled(), entity.kubernetesHpaMinReplicas(),
                        entity.kubernetesHpaMaxReplicas(), entity.kubernetesHpaCpuThreshold(),
                        entity.livenessProbe(), entity.readinessProbe(), entity.startupProbe(),
                        entity.openApiDocumentationEnabled(),
                        entity.circuitBreakerEnabled(), entity.circuitBreakerThreshold(),
                        entity.connectionTimeoutMs(), entity.readTimeoutMs(), entity.writeTimeoutMs(),
                        entity.deploymentStrategy(), entity.owner(),
                        entity.moduleIds(),
                        entity.gatewayIds(),
                        entity.envVars() != null ? entity.envVars().stream()
                                .map(e -> new EnvVar(e.name(), e.defaultValue(), e.secret(), e.required(), e.description()))
                                .toList() : List.of(),
                        entity.javaVersion(),
                        entity.outboxEnabled(),
                        entity.outboxTableName()));
    }

    @Override
    public Service save(Service entity) {
        // The domain Service does not model urlIds — start from the stored entity so a
        // domain save never wipes what the editor authored.
        var stored = repository.findById(entity.getId().id(), ServiceEntity.class).orElse(null);
        var builder = stored != null ? stored.toBuilder() : ServiceEntity.builder();
        repository.save(builder
                .id(entity.getId().id())
                .name(entity.getName().name())
                .gitRepository(entity.getGitRepository())
                .dockerImageRegistry(entity.getDockerImageRegistry())
                .dockerImageName(entity.getDockerImageName())
                .port(entity.getPort())
                .contextPath(entity.getContextPath())
                .database(entity.getDatabase())
                .dbMigrationTool(entity.getDbMigrationTool())
                .kubernetesReplicas(entity.getKubernetesReplicas())
                .kubernetesCpuRequest(entity.getKubernetesCpuRequest())
                .kubernetesCpuLimit(entity.getKubernetesCpuLimit())
                .kubernetesMemoryRequest(entity.getKubernetesMemoryRequest())
                .kubernetesMemoryLimit(entity.getKubernetesMemoryLimit())
                .kubernetesHpaEnabled(entity.isKubernetesHpaEnabled())
                .kubernetesHpaMinReplicas(entity.getKubernetesHpaMinReplicas())
                .kubernetesHpaMaxReplicas(entity.getKubernetesHpaMaxReplicas())
                .kubernetesHpaCpuThreshold(entity.getKubernetesHpaCpuThreshold())
                .livenessProbe(entity.getLivenessProbe())
                .readinessProbe(entity.getReadinessProbe())
                .startupProbe(entity.getStartupProbe())
                .openApiDocumentationEnabled(entity.isOpenApiDocumentationEnabled())
                .circuitBreakerEnabled(entity.isCircuitBreakerEnabled())
                .circuitBreakerThreshold(entity.getCircuitBreakerThreshold())
                .connectionTimeoutMs(entity.getConnectionTimeoutMs())
                .readTimeoutMs(entity.getReadTimeoutMs())
                .writeTimeoutMs(entity.getWriteTimeoutMs())
                .deploymentStrategy(entity.getDeploymentStrategy() != null ? entity.getDeploymentStrategy().name() : null)
                .owner(entity.getOwner())
                .gatewayIds(entity.getGatewayIds())
                .envVars(entity.getEnvVars() != null ? entity.getEnvVars().stream()
                        .map(e -> new EnvVarEntity(e.name(), e.defaultValue(), e.secret(), e.required(), e.description()))
                        .toList() : List.of())
                .javaVersion(entity.getJavaVersion())
                .outboxEnabled(entity.isOutboxEnabled())
                .outboxTableName(entity.getOutboxTableName())
                .moduleIds(entity.getModules().stream().map(ModuleId::id).toList())
                .build());
        return entity;
    }

    @Override
    public void deleteAllById(List<ServiceId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ServiceId::id).toList(), ServiceEntity.class);
    }
}
