package io.mateu.modux.modeldrivengenerator.domain.aggregates.page;

public record PageButton(
        String label,
        String icon,
        String useCaseId,
        String actionId,
        String mappingId
) {

    public PageButton(String label, String icon, String useCaseId, String actionId) {
        this(label, icon, useCaseId, actionId, null);
    }
}
