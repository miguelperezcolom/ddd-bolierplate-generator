package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record PageButtonEntity(
        String label,
        String icon,
        String useCaseId,
        String actionId
) {
}
