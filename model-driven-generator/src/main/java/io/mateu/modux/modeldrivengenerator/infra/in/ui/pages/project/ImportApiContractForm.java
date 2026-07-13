package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiExternalCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiExternalUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiInboundCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiInboundUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl.ImportWsdlCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importwsdl.ImportWsdlUseCase;
import io.mateu.uidl.annotations.Button;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * One door for API contracts, both formats and both directions: the file's format is
 * detected (WSDL vs OpenAPI) and the target decides the meaning — an EXTERNAL system
 * gains the operations it offers (callable by use cases and agents, pollable by
 * projections), or a BOUNDED CONTEXT gains use-case stubs it must implement. Exactly
 * one target. Deterministic ids: re-importing an evolved contract updates in place.
 */
@Service
@Scope("prototype")
@RequiredArgsConstructor
@Style("max-width:900px;margin: auto;")
@Title("Import API contract (OpenAPI / WSDL)")
public class ImportApiContractForm {

    final ImportOpenApiExternalUseCase openApiExternal;
    final ImportOpenApiInboundUseCase openApiInbound;
    final ImportWsdlUseCase wsdl;
    final io.mateu.modux.modeldrivengenerator.application.usecases.project.importapi.ImportApiEntityUseCase apiEntity;

    String filePath;

    String externalSystemId;

    String boundedContextId;

    @Button
    @SneakyThrows
    URI importContract() {
        var hasExternal = externalSystemId != null && !externalSystemId.isBlank();
        var hasBoundedContext = boundedContextId != null && !boundedContextId.isBlank();
        if (hasExternal && hasBoundedContext) {
            throw new IllegalArgumentException(
                    "Elige UN destino como mucho: sistema externo, bounded context, o ninguno"
                            + " (la API entra como elemento de primer nivel)");
        }
        if (!hasExternal && !hasBoundedContext) {
            // No target: the contract IS the element — a first-class API on the map,
            // its operations waiting to be wired to contexts / use cases / policies.
            apiEntity.handle(filePath);
            return URI.create("/graphicalEditor");
        }
        if (isWsdl(filePath)) {
            wsdl.handle(new ImportWsdlCommand(filePath,
                    hasExternal ? externalSystemId : null, hasBoundedContext ? boundedContextId : null));
        } else if (hasExternal) {
            openApiExternal.handle(new ImportOpenApiExternalCommand(externalSystemId, filePath));
        } else {
            openApiInbound.handle(new ImportOpenApiInboundCommand(boundedContextId, filePath));
        }
        return URI.create(hasExternal ? "/graphicalEditor" : "/modelo/behaviour/useCases");
    }

    @SneakyThrows
    private static boolean isWsdl(String filePath) {
        if (filePath == null || filePath.isBlank()) {
            throw new IllegalArgumentException("Indica la ruta del contrato (.yaml, .json o .wsdl)");
        }
        if (filePath.endsWith(".wsdl")) return true;
        var head = Files.readString(Path.of(filePath));
        return head.contains("<definitions") || head.contains(":definitions");
    }
}
