package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record PageButtonEntity(
        String label,
        String icon,
        String useCaseId,
        String actionId,
        /** ModelMapping applied to the viewmodel to build the use case request. */
        String mappingId
) {

    /** Backward-compatible constructor (pre-mappingId callers and stores). */
    public PageButtonEntity(String label, String icon, String useCaseId, String actionId) {
        this(label, icon, useCaseId, actionId, null);
    }
}
