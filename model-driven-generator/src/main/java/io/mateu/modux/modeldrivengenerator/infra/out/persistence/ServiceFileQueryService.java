package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ServiceQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceRow;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.DbMigrationTool;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.service.vo.EnvVar;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServiceFileQueryService implements ServiceQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ServiceRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ServiceEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ServiceRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ServiceEntity.class).map(ServiceEntity::name).orElseThrow();
    }

    @Override
    public Optional<ServiceDto> getById(String id) {
        return repository.findById(id, ServiceEntity.class)
                .map(entity -> new ServiceDto(entity.id(), entity.name(), entity.gitRepository(), entity.dockerImageRegistry(), entity.dockerImageName(), entity.port(), entity.contextPath(), entity.database(),
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
                                .toList() : java.util.List.of(),
                        entity.javaVersion(),
                        entity.outboxEnabled(),
                        entity.outboxTableName()));
    }
}
