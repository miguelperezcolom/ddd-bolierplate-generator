package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.project;

import io.mateu.modux.specdrivengenerator.application.usecases.project.importopenapi.ImportOpenApiCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.project.importopenapi.ImportOpenApiUseCase;
import io.mateu.uidl.annotations.Button;
import io.mateu.uidl.annotations.Style;
import io.mateu.uidl.annotations.Title;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.net.URI;

@Service
@Scope("prototype")
@RequiredArgsConstructor
@Slf4j
@Style("max-width:900px;margin: auto;")
@Title("Import OpenAPI spec")
public class ImportOpenApiForm {

    final ImportOpenApiUseCase useCase;

    String serviceId;

    String filePath;

    @Button
    URI importOpenApi() {
        useCase.handle(new ImportOpenApiCommand(serviceId, filePath));
        return URI.create("/services/" + serviceId);
    }
}
