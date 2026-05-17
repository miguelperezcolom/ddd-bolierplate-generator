package io.mateu.modux.specdrivengenerator.application.usecases.project.importopenapi;

import io.mateu.modux.specdrivengenerator.domain.aggregates.gateway.vo.GatewayAuthType;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.GatewayOperationEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.swagger.parser.OpenAPIParser;
import io.swagger.v3.oas.models.PathItem;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImportOpenApiUseCase {

    final CommonFileRepository repository;

    @SneakyThrows
    public void handle(ImportOpenApiCommand command) {
        var openApi = new OpenAPIParser()
                .readLocation(command.filePath(), null, null)
                .getOpenAPI();

        String name = openApi.getInfo().getTitle();

        var existing = repository.findAllOfType(GatewayEntity.class).stream()
                .filter(g -> name.equals(g.name()))
                .findFirst();

        String baseUrl = "";
        if (openApi.getServers() != null && !openApi.getServers().isEmpty()) {
            baseUrl = openApi.getServers().get(0).getUrl();
        }

        List<GatewayOperationEntity> operations = buildOperations(openApi.getPaths());

        GatewayEntity gatewayEntity;
        if (existing.isPresent()) {
            GatewayEntity g = existing.get();
            gatewayEntity = new GatewayEntity(
                    g.id(), g.name(), g.serviceId(), baseUrl,
                    g.authType(), g.authUsername(), g.authPassword(), g.authApiKeyHeaderName(),
                    g.authBearerToken(), g.authOAuth2ClientId(), g.authOAuth2ClientSecret(),
                    g.authOAuth2TokenUrl(), g.authOAuth2Scopes(), operations,
                    g.rateLimitEnabled(), g.rateLimitRequestsPerSecond(), g.rateLimitBurstSize(),
                    g.corsEnabled(), g.corsAllowedOrigins(), g.globalTimeoutMs());
        } else {
            String serviceId = command.serviceId() != null && !command.serviceId().isBlank()
                    ? command.serviceId() : null;
            gatewayEntity = new GatewayEntity(
                    UUID.randomUUID().toString(), name, serviceId, baseUrl,
                    GatewayAuthType.None, null, null, null,
                    null, null, null, null, null, operations,
                    false, null, null, false, null, null);
        }

        repository.save(gatewayEntity);
        log.info("Saved gateway '{}' with {} operations", name, operations.size());

        if (command.serviceId() != null && !command.serviceId().isBlank()) {
            repository.findById(command.serviceId(), ServiceEntity.class).ifPresent(service -> {
                if (!service.gatewayIds().contains(gatewayEntity.id())) {
                    var updatedIds = new ArrayList<>(service.gatewayIds());
                    updatedIds.add(gatewayEntity.id());
                    ServiceEntity updated = new ServiceEntity(
                            service.id(), service.name(), service.gitRepository(),
                            service.dockerImageRegistry(), service.dockerImageName(), service.port(),
                            service.contextPath(), service.database(), service.dbMigrationTool(),
                            service.kubernetesReplicas(), service.kubernetesCpuRequest(),
                            service.kubernetesCpuLimit(), service.kubernetesMemoryRequest(),
                            service.kubernetesMemoryLimit(), service.kubernetesHpaEnabled(),
                            service.kubernetesHpaMinReplicas(), service.kubernetesHpaMaxReplicas(),
                            service.kubernetesHpaCpuThreshold(), service.livenessProbe(),
                            service.readinessProbe(), service.startupProbe(),
                            service.openApiDocumentationEnabled(), service.circuitBreakerEnabled(),
                            service.circuitBreakerThreshold(), service.connectionTimeoutMs(),
                            service.readTimeoutMs(), service.writeTimeoutMs(),
                            service.deploymentStrategy(), service.owner(),
                            service.moduleIds(), updatedIds, service.envVars(),
                            service.javaVersion(), service.outboxEnabled(), service.outboxTableName());
                    repository.save(updated);
                }
            });
        }
    }

    private List<GatewayOperationEntity> buildOperations(Map<String, PathItem> paths) {
        if (paths == null) return List.of();
        List<GatewayOperationEntity> ops = new ArrayList<>();
        for (var pathEntry : paths.entrySet()) {
            String path = pathEntry.getKey();
            PathItem item = pathEntry.getValue();
            if (item.getGet() != null) ops.add(operation("GET", path, item.getGet().getOperationId()));
            if (item.getPost() != null) ops.add(operation("POST", path, item.getPost().getOperationId()));
            if (item.getPut() != null) ops.add(operation("PUT", path, item.getPut().getOperationId()));
            if (item.getPatch() != null) ops.add(operation("PATCH", path, item.getPatch().getOperationId()));
            if (item.getDelete() != null) ops.add(operation("DELETE", path, item.getDelete().getOperationId()));
            if (item.getHead() != null) ops.add(operation("HEAD", path, item.getHead().getOperationId()));
            if (item.getOptions() != null) ops.add(operation("OPTIONS", path, item.getOptions().getOperationId()));
            if (item.getTrace() != null) ops.add(operation("TRACE", path, item.getTrace().getOperationId()));
        }
        return ops;
    }

    private GatewayOperationEntity operation(String method, String path, String operationId) {
        String name = (operationId != null && !operationId.isBlank())
                ? operationId
                : method + " " + path;
        return new GatewayOperationEntity(
                UUID.randomUUID().toString(), name, method, path,
                null, null, null, null, null, false, null, null);
    }
}
