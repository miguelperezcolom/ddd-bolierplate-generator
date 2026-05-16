package io.mateu.modux.specdrivengenerator.application.usecases.service.create;

import io.mateu.modux.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.Service;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.DeploymentStrategy;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.modux.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.RequiredArgsConstructor;

import java.util.List;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class CreateServiceUseCase {

    final ServiceRepository repository;

    public void handle(CreateServiceCommand command) {
        var service = Service.of(
                new ServiceId(command.id()),
                new ServiceName(command.name()),
                command.gitRepository(),
                command.dockerImageRegistry(),
                command.dockerImageName(),
                command.port(),
                command.contextPath(),
                command.database(),
                command.dbMigrationTool(),
                command.kubernetesReplicas(),
                command.kubernetesCpuRequest(),
                command.kubernetesCpuLimit(),
                command.kubernetesMemoryRequest(),
                command.kubernetesMemoryLimit(),
                command.kubernetesHpaEnabled(),
                command.kubernetesHpaMinReplicas(),
                command.kubernetesHpaMaxReplicas(),
                command.kubernetesHpaCpuThreshold(),
                command.livenessProbe(),
                command.readinessProbe(),
                command.startupProbe(),
                command.openApiDocumentationEnabled(),
                command.circuitBreakerEnabled(),
                command.circuitBreakerThreshold(),
                command.connectionTimeoutMs(),
                command.readTimeoutMs(),
                command.writeTimeoutMs(),
                command.deploymentStrategy() != null ? DeploymentStrategy.valueOf(command.deploymentStrategy()) : null,
                command.owner(),
                command.moduleIds() != null ? command.moduleIds().stream().map(ModuleId::new).toList() : List.of(),
                command.gatewayIds(),
                command.envVars(),
                command.javaVersion(),
                command.outboxEnabled(),
                command.outboxTableName());
        repository.save(service);
    }

}
