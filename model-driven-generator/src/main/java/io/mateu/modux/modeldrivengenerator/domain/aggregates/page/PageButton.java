package io.mateu.modux.modeldrivengenerator.domain.aggregates.page;

public record PageButton(
        String label,
        String icon,
        String useCaseId,
        String actionId
) {
}
