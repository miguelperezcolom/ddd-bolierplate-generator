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
    private final ConfigurableApplicationContext context;

    @Override
    public void run(ApplicationArguments args) {
        if (args.containsOption("modux.check")) {
            runCheck();
            return;
        }
        var projectIds = args.getOptionValues("modux.generate");
        if (projectIds == null || projectIds.isEmpty()) {
            return; // normal server mode
        }
        var projectId = projectIds.get(0);
        var output = firstOrNull(args.getOptionValues("modux.output"));

        log.info("CLI code generation starting: project='{}' output='{}'", projectId, output != null ? output : "(stored path)");
        try {
            generateCodeUseCase.handle(new GenerateCodeCommand(projectId, output, null, false));
            log.info("CLI code generation finished for project '{}'", projectId);
            System.exit(SpringApplication.exit(context, () -> 0));
        } catch (Exception e) {
            log.error("CLI code generation failed for project '{}'", projectId, e);
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
