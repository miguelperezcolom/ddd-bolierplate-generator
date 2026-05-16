package io.mateu.mdd.specdrivengenerator.infra.out.persistence;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.EnvVarEntity;
import io.mateu.mdd.specdrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceFileRepository implements ServiceRepository {

    final CommonFileRepository repository;

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
                        entity.moduleIds(),
                        entity.gatewayIds(),
                        entity.envVars() != null ? entity.envVars().stream()
                                .map(e -> new EnvVar(e.name(), e.defaultValue(), e.secret(), e.required(), e.description()))
                                .toList() : List.of()));
    }

    @Override
    public Service save(Service entity) {
        repository.save(new ServiceEntity(
                entity.getId().id(),
                entity.getName().name(),
                entity.getGitRepository(),
                entity.getDockerImageRegistry(),
                entity.getDockerImageName(),
                entity.getPort(),
                entity.getContextPath(),
                entity.getDatabase(),
                entity.getDbMigrationTool(),
                entity.getKubernetesReplicas(),
                entity.getKubernetesCpuRequest(),
                entity.getKubernetesCpuLimit(),
                entity.getKubernetesMemoryRequest(),
                entity.getKubernetesMemoryLimit(),
                entity.isKubernetesHpaEnabled(),
                entity.getKubernetesHpaMinReplicas(),
                entity.getKubernetesHpaMaxReplicas(),
                entity.getKubernetesHpaCpuThreshold(),
                entity.getLivenessProbe(),
                entity.getReadinessProbe(),
                entity.getStartupProbe(),
                entity.isOpenApiDocumentationEnabled(),
                entity.isCircuitBreakerEnabled(),
                entity.getCircuitBreakerThreshold(),
                entity.getConnectionTimeoutMs(),
                entity.getReadTimeoutMs(),
                entity.getWriteTimeoutMs(),
                entity.getModules().stream().map(ModuleId::id).toList(),
                entity.getGatewayIds(),
                entity.getEnvVars() != null ? entity.getEnvVars().stream()
                        .map(e -> new EnvVarEntity(e.name(), e.defaultValue(), e.secret(), e.required(), e.description()))
                        .toList() : List.of()));
        return entity;
    }

    @Override
    public void deleteAllById(List<ServiceId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(ServiceId::id).toList());
    }
}
