package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

public record PageButton(
        String label,
        String icon,
        String useCaseId,
        String actionId
) {
}
