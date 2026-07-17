package io.mateu.modux.plugin;

import io.mateu.modux.modeldrivengenerator.application.usecases.project.importasyncapi.ImportAsyncApiCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.project.importasyncapi.ImportAsyncApiUseCase;
import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;

@Mojo(name = "import-asyncapi")
public class ImportAsyncApiMojo extends AbstractMojo {

    @Parameter(property = "modux.specFile",
               defaultValue = "${project.basedir}/.dev/data/model-driven-store.yaml")
    private String specFile;

    @Parameter(property = "modux.boundedContextId")
    private String boundedContextId;

    @Parameter(property = "modux.filePath", required = true)
    private String filePath;

    @Override
    public void execute() throws MojoExecutionException {
        getLog().info("Modux import-asyncapi: " + filePath);
        System.setProperty("modux.model-file", specFile);

        try (var ctx = ModuxContext.create()) {
            ctx.getBean(ImportAsyncApiUseCase.class)
               .handle(new ImportAsyncApiCommand(boundedContextId, filePath));
        } catch (Exception e) {
            throw new MojoExecutionException("AsyncAPI import failed: " + e.getMessage(), e);
        }
    }
}
