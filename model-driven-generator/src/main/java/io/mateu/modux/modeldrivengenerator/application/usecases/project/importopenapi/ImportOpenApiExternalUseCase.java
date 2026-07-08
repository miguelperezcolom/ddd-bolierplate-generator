package io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemUseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.swagger.parser.OpenAPIParser;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * The THIRD direction of the OpenAPI import: the contract describes what a PARTNER offers,
 * so every operation lands as an {@link ExternalSystemUseCaseEntity} on the external system
 * — the callable surface our use cases (CallExternalUseCase) and AI agents consume, and the
 * pollable source of projections. Deterministic ids make re-imports update, not duplicate.
 * (The other two directions: outbound → gateway, inbound → a module's use-case stubs.)
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImportOpenApiExternalUseCase {

    final CommonFileRepository repository;

    @SneakyThrows
    public void handle(ImportOpenApiExternalCommand command) {
        var openApi = new OpenAPIParser()
                .readLocation(command.filePath(), null, null)
                .getOpenAPI();
        var result = OpenApiGatewayMapper.map(openApi);

        var project = owningProject();
        var external = project.externalSystems().stream()
                .filter(x -> x.id().equals(command.externalSystemId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown external system: " + command.externalSystemId()));

        var merged = new ArrayList<>(external.useCases());
        var imported = 0;
        for (var op : result.operations()) {
            var operation = new ExternalSystemUseCaseEntity(
                    operationId(external.id(), op.name()), op.name(),
                    op.httpMethod() + " " + op.path());
            var existing = merged.stream()
                    .filter(u -> u.id().equals(operation.id())).findFirst();
            if (existing.isPresent()) {
                merged.set(merged.indexOf(existing.get()), operation);
            } else {
                merged.add(operation);
            }
            imported++;
        }
        replaceExternal(project, withUseCases(external, List.copyOf(merged)));
        log.info("Imported {} operations into external system '{}'",
                imported, command.externalSystemId());
    }

    public static String operationId(String externalSystemId, String operationName) {
        return "xuc-" + externalSystemId.replaceFirst("^ext-", "") + "-" + kebab(operationName);
    }

    public static String kebab(String name) {
        return name.replaceAll("([a-z0-9])([A-Z])", "$1-$2")
                .replaceAll("[^A-Za-z0-9]+", "-")
                .replaceAll("^-+|-+$", "")
                .toLowerCase();
    }

    private void replaceExternal(ProjectEntity project, ExternalSystemEntity updated) {
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> x.id().equals(updated.id()) ? updated : x)
                .toList()));
    }

    private ProjectEntity owningProject() {
        return repository.findAllOfType(ProjectEntity.class).stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No project in the model store"));
    }

    /** Record copy with only useCases replaced — every other field preserved verbatim. */
    public static ExternalSystemEntity withUseCases(
            ExternalSystemEntity x, List<ExternalSystemUseCaseEntity> useCases) {
        return x.withUseCases(useCases);
    }

    /** Record copy with only externalSystems replaced — every other field preserved verbatim. */
    public static ProjectEntity withExternalSystems(
            ProjectEntity p, List<ExternalSystemEntity> externalSystems) {
        return new ProjectEntity(
                p.id(), p.name(), p.outputPath(), p.packageName(), p.gitRepository(), p.database(),
                p.dbMigrationTool(), p.terraformProvider(), p.terraformProviderVersion(),
                p.terraformBackendType(), p.iamProvider(), p.messageBrokerType(), p.tracingProvider(),
                p.metricsProvider(), p.loggingProvider(), p.llmProvider(), p.cacheProvider(),
                p.fileStorageProvider(), p.emailProvider(), p.secretsProvider(), p.cicdProvider(),
                p.environments(), p.serviceIds(), p.contextMap(), p.tenancyStrategy(),
                externalSystems, p.objective());
    }
}
