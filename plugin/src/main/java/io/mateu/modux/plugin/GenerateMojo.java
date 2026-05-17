package io.mateu.modux.plugin;

import io.mateu.modux.specdrivengenerator.application.usecases.project.generatecode.GenerateCodeCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.project.generatecode.GenerateCodeUseCase;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.LifecyclePhase;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@Mojo(name = "generate", defaultPhase = LifecyclePhase.GENERATE_SOURCES)
public class GenerateMojo extends AbstractMojo {

    @Parameter(property = "modux.projectId", required = true)
    private String projectId;

    @Parameter(property = "modux.specFile",
               defaultValue = "${project.basedir}/.dev/data/spec-driven-store.yaml")
    private String specFile;

    @Parameter(property = "modux.outputPath",
               defaultValue = "${project.basedir}/generated")
    private String outputPath;

    @Parameter(property = "modux.packageName", defaultValue = "com.example")
    private String packageName;

    @Parameter(property = "modux.sourceOnly", defaultValue = "false")
    private boolean sourceOnly;

    @Override
    public void execute() throws MojoExecutionException {
        getLog().info("Modux: generating code for project '" + projectId + "' from " + specFile);
        System.setProperty("modux.spec-file", specFile);
        try (var ctx = new AnnotationConfigApplicationContext()) {
            ctx.register(CommonFileRepository.class, GenerateCodeUseCase.class);
            ctx.refresh();
            ctx.getBean(GenerateCodeUseCase.class)
               .handle(new GenerateCodeCommand(projectId, outputPath, packageName, sourceOnly));
        } catch (Exception e) {
            throw new MojoExecutionException("Code generation failed: " + e.getMessage(), e);
        }
    }
}
