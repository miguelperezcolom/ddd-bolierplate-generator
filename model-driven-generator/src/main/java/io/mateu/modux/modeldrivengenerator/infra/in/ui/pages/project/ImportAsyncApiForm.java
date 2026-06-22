package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.project;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importasyncapi.ImportAsyncApiCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importasyncapi.ImportAsyncApiUseCase;
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
@Title("Import AsyncAPI spec")
public class ImportAsyncApiForm {

    final ImportAsyncApiUseCase useCase;

    String moduleId;

    String filePath;

    @Button
    URI importAsyncApi() {
        useCase.handle(new ImportAsyncApiCommand(moduleId, filePath));
        return URI.create("/modules/" + moduleId);
    }
}
