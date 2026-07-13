package io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi;

import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.swagger.parser.OpenAPIParser;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Imports an OpenAPI document as the contract a boundedContext EXPOSES (e.g. EasyTravelAPI on a BFF):
 * every operation becomes a REST-exposed {@link UseCaseEntity} stub (method, path, typed
 * input/output models) attached to the boundedContext; the developer fills in the behaviour. Deterministic
 * ids (derived from the operation name) make re-imports update instead of duplicate. Models are
 * mapped exactly as in the outbound (gateway) import, so both directions share one vocabulary.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImportOpenApiInboundUseCase {

    final ModelStore repository;

    @SneakyThrows
    public void handle(ImportOpenApiInboundCommand command) {
        var openApi = new OpenAPIParser()
                .readLocation(command.filePath(), null, null)
                .getOpenAPI();

        var result = OpenApiGatewayMapper.map(openApi);

        // upsert the typed models derived from the OpenAPI schemas (deterministic ids → re-import updates)
        result.models().forEach(repository::save);

        var boundedContext = command.boundedContextId() == null ? null
                : repository.findById(command.boundedContextId(), BoundedContextEntity.class).orElse(null);

        var useCaseIds = new ArrayList<String>();
        for (var op : result.operations()) {
            var id = useCaseId(op.name(), boundedContext);
            useCaseIds.add(id);
            repository.save(new UseCaseEntity(
                    id, op.name(),
                    true, false, false, false, false,   // exposedAsRest only — the developer decides the rest
                    op.inputModelId(), op.outputModelId(),
                    List.of(),                           // no steps: custom implementation stub
                    List.of(), List.of(),
                    versionOf(openApi),
                    null,
                    op.httpMethod(), op.path(),
                    null, null, null, null, null,
                    false, null, null,
                    null, false, null,
                    false, null,
                    null, null));
        }

        attachToBoundedContext(command.boundedContextId(), useCaseIds);
        log.info("Imported {} inbound use cases and {} models into boundedContext '{}'",
                useCaseIds.size(), result.models().size(), command.boundedContextId());
    }

    private void attachToBoundedContext(String boundedContextId, List<String> useCaseIds) {
        if (boundedContextId == null || boundedContextId.isBlank()) return;
        repository.findById(boundedContextId, BoundedContextEntity.class).ifPresent(m -> {
            var merged = new ArrayList<>(m.useCaseIds() != null ? m.useCaseIds() : List.<String>of());
            useCaseIds.stream().filter(id -> !merged.contains(id)).forEach(merged::add);
            repository.save(m.toBuilder().useCaseIds(merged).build());
        });
    }

    /**
     * Deterministic id (re-import updates), but never hijacking an id owned elsewhere: if
     * {@code uc-<name>} already exists and is not one of this boundedContext's use cases, the id is
     * scoped with the boundedContext name instead of silently overwriting a foreign use case.
     */
    private String useCaseId(String operationName, BoundedContextEntity boundedContext) {
        var base = "uc-" + lowerFirst(operationName);
        var ownedByBoundedContext = boundedContext != null && boundedContext.useCaseIds() != null
                && boundedContext.useCaseIds().contains(base);
        var takenElsewhere = !ownedByBoundedContext
                && repository.findById(base, UseCaseEntity.class).isPresent();
        if (takenElsewhere) {
            var scope = boundedContext != null ? lowerFirst(boundedContext.name()) : "imported";
            return "uc-" + scope + "-" + lowerFirst(operationName);
        }
        return base;
    }

    private static String versionOf(io.swagger.v3.oas.models.OpenAPI openApi) {
        return openApi.getInfo() != null ? openApi.getInfo().getVersion() : null;
    }

    private static String lowerFirst(String s) {
        return s == null || s.isEmpty() ? s : Character.toLowerCase(s.charAt(0)) + s.substring(1);
    }
}
