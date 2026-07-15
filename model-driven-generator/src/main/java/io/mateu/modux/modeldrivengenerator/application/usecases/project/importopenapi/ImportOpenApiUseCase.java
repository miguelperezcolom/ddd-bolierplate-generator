package io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.swagger.parser.OpenAPIParser;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImportOpenApiUseCase {

    final ModelStore repository;

    @SneakyThrows
    public void handle(ImportOpenApiCommand command) {
        var openApi = new OpenAPIParser()
                .readLocation(command.filePath(), null, null)
                .getOpenAPI();

        // a valid identifier for the gateway name (real OpenAPI titles often contain spaces)
        String name = OpenApiGatewayMapper.pascalCase(openApi.getInfo().getTitle());

        var result = OpenApiGatewayMapper.map(openApi);

        // upsert the typed models derived from the OpenAPI schemas (deterministic ids → re-import updates)
        result.models().forEach(repository::save);

        String baseUrl = "";
        if (openApi.getServers() != null && !openApi.getServers().isEmpty()) {
            baseUrl = openApi.getServers().get(0).getUrl();
        }

        var existing = repository.findAllOfType(GatewayEntity.class).stream()
                .filter(g -> name.equals(g.name()))
                .findFirst();

        GatewayEntity gatewayEntity;
        if (existing.isPresent()) {
            GatewayEntity g = existing.get();
            // preserve any auth/credentials the user configured; refresh baseUrl and operations
            gatewayEntity = new GatewayEntity(
                    g.id(), g.name(), g.serviceId(), baseUrl,
                    g.authType(), g.authUsername(), g.authPassword(), g.authApiKeyHeaderName(),
                    g.authBearerToken(), g.authOAuth2ClientId(), g.authOAuth2ClientSecret(),
                    g.authOAuth2TokenUrl(), g.authOAuth2Scopes(), result.operations(),
                    g.rateLimitEnabled(), g.rateLimitRequestsPerSecond(), g.rateLimitBurstSize(),
                    g.corsEnabled(), g.corsAllowedOrigins(), g.globalTimeoutMs(), null);
        } else {
            String serviceId = command.serviceId() != null && !command.serviceId().isBlank()
                    ? command.serviceId() : null;
            var auth = result.auth();
            gatewayEntity = new GatewayEntity(
                    UUID.randomUUID().toString(), name, serviceId, baseUrl,
                    auth.type(), null, null, auth.apiKeyHeaderName(),
                    null, null, null, auth.oauthTokenUrl(), auth.oauthScopes(), result.operations(),
                    false, null, null, false, null, null, null);
        }

        repository.save(gatewayEntity);
        log.info("Saved gateway '{}' with {} operations and {} models (auth: {})",
                name, result.operations().size(), result.models().size(), result.auth().type());

        if (command.serviceId() != null && !command.serviceId().isBlank()) {
            repository.findById(command.serviceId(), ServiceEntity.class).ifPresent(service -> {
                if (!service.gatewayIds().contains(gatewayEntity.id())) {
                    var updatedIds = new ArrayList<>(service.gatewayIds());
                    updatedIds.add(gatewayEntity.id());
                    ServiceEntity updated = service.toBuilder().gatewayIds(updatedIds).build();
                    repository.save(updated);
                }
            });
        }
    }
}
