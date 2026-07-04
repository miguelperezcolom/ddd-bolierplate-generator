package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatehla;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.lint.ModelSnapshot;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Generates the project's design document (HLA) from the loaded model — the human deliverable for
 * the dev team / architecture review, guaranteed in sync with the spec because it is derived from it.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GenerateHlaUseCase {

    final CommonFileRepository repository;

    /** Renders the document for the loaded model. */
    public String render() {
        return HlaDocumentRenderer.render(ModelSnapshot.from(repository));
    }

    /** Renders and writes the document to the given path (e.g. next to the generated code). */
    @SneakyThrows
    public Path writeTo(Path target) {
        var markdown = render();
        Files.createDirectories(target.toAbsolutePath().getParent());
        Files.writeString(target, markdown);
        log.info("HLA document written to {}", target.toAbsolutePath());
        return target;
    }
}
