package io.mateu.modux.modeldrivengenerator.infra.in.cli;

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
 * </pre>
 *
 * Generates the project and exits. Without {@code --modux.generate} the application starts
 * normally (UI server mode).
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class GenerationCliRunner implements ApplicationRunner {

    private final GenerateCodeUseCase generateCodeUseCase;
    private final ConfigurableApplicationContext context;

    @Override
    public void run(ApplicationArguments args) {
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

    private static String firstOrNull(List<String> values) {
        return values == null || values.isEmpty() ? null : values.get(0);
    }
}
