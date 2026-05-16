package io.mateu.mdd.specdrivengenerator.application.usecases.service.save;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ServiceRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.DeploymentStrategy;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.service.vo.ServiceName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaveServiceUseCase {

    final ServiceRepository repository;

    public void handle(SaveServiceCommand command) {
        var service = repository.findById(new ServiceId(command.id())).orElseThrow();
        service.update(new ServiceName(command.name()),
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
                command.moduleIds().stream().map(ModuleId::new).toList(),
                command.gatewayIds(),
                command.envVars(),
                command.javaVersion(),
                command.outboxEnabled(),
                command.outboxTableName());
        repository.save(service);
    }

}
