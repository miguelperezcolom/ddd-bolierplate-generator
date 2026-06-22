package io.mateu.modux.plugin;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.aicomplete.AiCompleteCodeCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.aicomplete.AiCompleteCodeUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.ai.ClaudeApiClient;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@Mojo(name = "ai-complete")
public class AiCompleteMojo extends AbstractMojo {

    @Parameter(property = "modux.projectId", required = true)
    private String projectId;

    @Parameter(property = "modux.specFile",
               defaultValue = "${project.basedir}/.dev/data/model-driven-store.yaml")
    private String specFile;

    @Parameter(property = "modux.outputPath",
               defaultValue = "${project.basedir}/generated")
    private String outputPath;

    @Parameter(property = "modux.packageName", defaultValue = "com.example")
    private String packageName;

    @Parameter(property = "modux.apiKey")
    private String apiKey;

    @Parameter(property = "modux.model",
               defaultValue = "claude-haiku-4-5-20251001")
    private String model;

    @Override
    public void execute() throws MojoExecutionException {
        if (apiKey == null || apiKey.isBlank()) {
            apiKey = System.getenv("ANTHROPIC_API_KEY");
        }
        if (apiKey == null || apiKey.isBlank()) {
            throw new MojoExecutionException(
                    "No API key found. Set modux.apiKey or ANTHROPIC_API_KEY env var.");
        }

        getLog().info("Modux AI complete: project '" + projectId + "' using model " + model);
        System.setProperty("modux.model-file", specFile);

        try (var ctx = new AnnotationConfigApplicationContext()) {
            ctx.register(CommonFileRepository.class, ClaudeApiClient.class, AiCompleteCodeUseCase.class);
            ctx.refresh();
            ctx.getBean(AiCompleteCodeUseCase.class)
               .handle(new AiCompleteCodeCommand(projectId, outputPath, packageName, apiKey, model));
        } catch (Exception e) {
            throw new MojoExecutionException("AI completion failed: " + e.getMessage(), e);
        }
    }
}
