package io.mateu.modux.modeldrivengenerator.application.usecases.project.importapi;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiExternalUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.OpenApiGatewayMapper;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl.WsdlParser;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.swagger.parser.OpenAPIParser;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

/**
 * Imports a contract (OpenAPI or WSDL) as a FIRST-CLASS {@link ApiEntity}: the published
 * API lives on the map at the level of the bounded contexts, with its operations waiting
 * to be wired to whoever implements them (a context, a use case, a policy). Deterministic
 * ids — re-importing an evolved contract updates the operations in place and PRESERVES
 * the wiring already drawn.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImportApiEntityUseCase {

    final CommonFileRepository repository;

    /** Returns the api id, so callers can navigate to it. */
    @SneakyThrows
    public String handle(String filePath) {
        var isWsdl = filePath.endsWith(".wsdl")
                || java.nio.file.Files.readString(Path.of(filePath)).contains("definitions");
        return isWsdl ? importWsdl(filePath) : importOpenApi(filePath);
    }

    private String importOpenApi(String filePath) {
        var openApi = new OpenAPIParser().readLocation(filePath, null, null).getOpenAPI();
        var title = openApi.getInfo() != null && openApi.getInfo().getTitle() != null
                ? openApi.getInfo().getTitle() : "API";
        var operations = OpenApiGatewayMapper.map(openApi).operations().stream()
                .map(op -> new ApiOperationEntity(null, op.name(), op.httpMethod(), op.path(),
                        op.httpMethod() + " " + op.path(), null, null))
                .toList();
        return upsert(title, operations);
    }

    private String importWsdl(String filePath) {
        var operations = WsdlParser.parse(Path.of(filePath));
        var title = operations.get(0).portType();
        return upsert(title, operations.stream()
                .map(op -> new ApiOperationEntity(null, op.name(), null, null,
                        "SOAP " + op.portType() + "." + op.name()
                                + (op.documentation() == null || op.documentation().isBlank()
                                        ? "" : " — " + op.documentation()),
                        null, null))
                .toList());
    }

    /** Same-id operations keep their target wiring; new ones join; the rest survive. */
    private String upsert(String title, List<ApiOperationEntity> imported) {
        var apiId = "api-" + ImportOpenApiExternalUseCase.kebab(title);
        var existing = repository.findById(apiId, ApiEntity.class).orElse(null);
        var merged = new ArrayList<>(existing != null ? existing.operations()
                : List.<ApiOperationEntity>of());
        for (var op : imported) {
            var id = "apiop-" + apiId.replaceFirst("^api-", "") + "-"
                    + ImportOpenApiExternalUseCase.kebab(op.name());
            var previous = merged.stream().filter(o -> o.id().equals(id)).findFirst();
            var next = new ApiOperationEntity(id, op.name(), op.httpMethod(), op.path(),
                    op.description(),
                    previous.map(ApiOperationEntity::targetModuleId).orElse(null),
                    previous.map(ApiOperationEntity::targetUseCaseId).orElse(null));
            if (previous.isPresent()) {
                merged.set(merged.indexOf(previous.get()), next);
            } else {
                merged.add(next);
            }
        }
        repository.save(new ApiEntity(apiId, title,
                existing != null ? existing.description() : null, List.copyOf(merged)));
        log.info("Imported API '{}' with {} operations", title, imported.size());
        return apiId;
    }
}
