package io.mateu.modux.modeldrivengenerator.application.usecases.project.generatecode;

public record GenerateCodeCommand(String projectId, String outputPath, String packageName, boolean sourceOnly,
                                  String viewId) {

    /** Full-project generation (no view scope). */
    public GenerateCodeCommand(String projectId, String outputPath, String packageName, boolean sourceOnly) {
        this(projectId, outputPath, packageName, sourceOnly, null);
    }
}
