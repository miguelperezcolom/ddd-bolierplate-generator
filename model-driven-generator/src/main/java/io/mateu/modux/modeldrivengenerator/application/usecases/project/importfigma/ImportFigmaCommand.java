package io.mateu.modux.modeldrivengenerator.application.usecases.project.importfigma;

/**
 * Import screens designed in Figma with the Mateu library. Provide either {@code fileKey} +
 * {@code token} (the file is fetched from the Figma REST API) or {@code localPath} (a previously
 * downloaded {@code GET /v1/files/:key} JSON — offline runs and tests). {@code contractPath}
 * overrides the bundled Mateu design contract.
 */
public record ImportFigmaCommand(String fileKey, String token, String localPath, String contractPath) {

    public static ImportFigmaCommand fromApi(String fileKey, String token) {
        return new ImportFigmaCommand(fileKey, token, null, null);
    }

    public static ImportFigmaCommand fromFile(String localPath) {
        return new ImportFigmaCommand(null, null, localPath, null);
    }
}
