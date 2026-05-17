package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record PageButtonEntity(
        String label,
        String icon,
        String useCaseId,
        String actionId
) {
}
