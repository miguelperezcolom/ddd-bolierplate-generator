package io.mateu.modux.modeldrivengenerator.infra.in.cli;

import io.mateu.modux.modeldrivengenerator.application.usecases.model.check.CheckModelUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Headless code generation from the command line:
 *
 * <pre>
 *   --modux.generate=&lt;projectId&gt; [--modux.output=&lt;dir&gt;]
 *   --modux.check                              # referential-integrity check, exits 1 if broken
 * </pre>
 *
 * Generates the project (or checks the model) and exits. Without either flag the application starts
 * normally (UI server mode).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class GenerationCliRunner implements ApplicationRunner {

    private final GenerateCodeUseCase generateCodeUseCase;
    private final CheckModelUseCase checkModelUseCase;
    private final io.mateu.modux.modeldrivengenerator.application.usecases.model.view.ResolveViewClosureUseCase resolveViewClosureUseCase;
    private final io.mateu.modux.modeldrivengenerator.application.usecases.model.view.LoadViewScopeUseCase loadViewScopeUseCase;
    private final io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository repository;
    private final ConfigurableApplicationContext context;

    @Override
    public void run(ApplicationArguments args) {
        if (args.containsOption("modux.check")) {
            runCheck();
            return;
        }
        if (args.containsOption("modux.split")) {
            runStorageConversion(() ->
                    repository.splitTo(java.nio.file.Path.of(firstOrNull(args.getOptionValues("modux.split")))));
            return;
        }
        if (args.containsOption("modux.merge")) {
            runStorageConversion(() ->
                    repository.mergeTo(java.nio.file.Path.of(firstOrNull(args.getOptionValues("modux.merge")))));
            return;
        }
        if (args.containsOption("modux.load-view")) {
            runLoadView(firstOrNull(args.getOptionValues("modux.load-view")));
            return;
        }
        var viewId = firstOrNull(args.getOptionValues("modux.view"));
        var projectIds = args.getOptionValues("modux.generate");
        if (projectIds == null || projectIds.isEmpty()) {
            // `--modux.view` alone inspects the view's closure; otherwise start the UI server
            if (viewId != null) {
                runViewClosure(viewId);
            }
            return;
        }
        var projectId = projectIds.get(0);
        var output = firstOrNull(args.getOptionValues("modux.output"));

        log.info("CLI code generation starting: project='{}' output='{}'{}", projectId,
                output != null ? output : "(stored path)", viewId != null ? " view='" + viewId + "'" : "");
        try {
            generateCodeUseCase.handle(new GenerateCodeCommand(projectId, output, null, false, viewId));
            log.info("CLI code generation finished for project '{}'", projectId);
            System.exit(SpringApplication.exit(context, () -> 0));
        } catch (Exception e) {
            log.error("CLI code generation failed for project '{}'", projectId, e);
            System.exit(SpringApplication.exit(context, () -> 1));
        }
    }

    private void runLoadView(String viewId) {
        try {
            var load = loadViewScopeUseCase.load(viewId);
            log.info("Partially loaded view '{}': {} element(s) in memory (the rest of the model stays on disk)",
                    viewId, load.loadedElements());
            if (!load.missing().isEmpty()) {
                log.error("Missing members (no such element): {}", load.missing());
            }
            System.exit(SpringApplication.exit(context, () -> load.missing().isEmpty() ? 0 : 1));
        } catch (Exception e) {
            log.error("Partial load failed for view '{}'", viewId, e);
            System.exit(SpringApplication.exit(context, () -> 1));
        }
    }

    private void runViewClosure(String viewId) {
        try {
            var closure = resolveViewClosureUseCase.resolve(viewId);
            log.info("View '{}': {} member(s) → {} element(s) in the dependency closure",
                    viewId, closure.memberIds().size(), closure.closureIds().size());
            closure.closureIds().forEach(id -> log.info("  - {}", id));
            if (!closure.missingMembers().isEmpty()) {
                log.error("Missing members (no such element): {}", closure.missingMembers());
            }
            System.exit(SpringApplication.exit(context, () -> closure.missingMembers().isEmpty() ? 0 : 1));
        } catch (Exception e) {
            log.error("View closure failed for '{}'", viewId, e);
            System.exit(SpringApplication.exit(context, () -> 1));
        }
    }

    private void runStorageConversion(Runnable conversion) {
        try {
            conversion.run();
            System.exit(SpringApplication.exit(context, () -> 0));
        } catch (Exception e) {
            log.error("Model storage conversion failed", e);
            System.exit(SpringApplication.exit(context, () -> 1));
        }
    }

    private void runCheck() {
        var violations = checkModelUseCase.check();
        if (violations.isEmpty()) {
            log.info("Model check passed: no dangling references found.");
            System.exit(SpringApplication.exit(context, () -> 0));
            return;
        }
        log.error("Model check failed: {} dangling reference(s) found:", violations.size());
        violations.forEach(v -> log.error("  - {}", v));
        System.exit(SpringApplication.exit(context, () -> 1));
    }

    private static String firstOrNull(List<String> values) {
        return values == null || values.isEmpty() ? null : values.get(0);
    }
}
