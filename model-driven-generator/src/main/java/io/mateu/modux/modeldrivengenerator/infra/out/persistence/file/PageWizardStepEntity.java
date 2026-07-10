package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/**
 * One step of a WIZARD page. The step is the first-class thing: it exists on its
 * own (a label, an order) and MAPS to the page that implements it — mapping that
 * can arrive later, or change, without the step losing its place.
 */
public record PageWizardStepEntity(
        String pageId,
        String label,
        /** Stable identity (pages remap and labels repeat); null on pre-id stores. */
        String id
) {

    /** Backward-compatible constructor (pre-id callers and stores). */
    public PageWizardStepEntity(String pageId, String label) {
        this(pageId, label, null);
    }

    /** The identity commands address: the id, or the mapped page on legacy steps. */
    public String key() {
        return id != null ? id : pageId;
    }
}
