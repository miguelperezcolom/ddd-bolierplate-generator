package io.mateu.modux.plugin;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importopenapi.ImportOpenApiUseCase;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@Mojo(name = "import-openapi")
public class ImportOpenApiMojo extends AbstractMojo {

    @Parameter(property = "modux.specFile",
               defaultValue = "${project.basedir}/.dev/data/model-driven-store.yaml")
    private String specFile;

    @Parameter(property = "modux.serviceId")
    private String serviceId;

    @Parameter(property = "modux.filePath", required = true)
    private String filePath;

    @Override
    public void execute() throws MojoExecutionException {
        getLog().info("Modux import-openapi: " + filePath);
        System.setProperty("modux.model-file", specFile);

        try (var ctx = new AnnotationConfigApplicationContext()) {
            ctx.register(CommonFileRepository.class, ImportOpenApiUseCase.class);
            ctx.refresh();
            ctx.getBean(ImportOpenApiUseCase.class)
               .handle(new ImportOpenApiCommand(serviceId, filePath));
        } catch (Exception e) {
            throw new MojoExecutionException("OpenAPI import failed: " + e.getMessage(), e);
        }
    }
}
