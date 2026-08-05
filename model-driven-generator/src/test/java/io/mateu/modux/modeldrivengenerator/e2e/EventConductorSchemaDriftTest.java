package io.mateu.modux.modeldrivengenerator.e2e;

import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.EventConductorSchema;
import org.junit.jupiter.api.Test;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assumptions.assumeTrue;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * That modux's copies of EventConductor's schemas still say what EventConductor says.
 *
 * <p>modux GENERATES EventConductor workflow and form definitions, so those schemas define what
 * is being produced — EventConductor rules, and when the two disagree the one that is wrong is
 * modux. The copies are vendored because generation is hermetic: a build cannot require another
 * repository to be present. That is the same snapshot/coordinate split as §4.7, and it has the
 * same consequence — a snapshot can go stale, so something has to notice.
 *
 * <p>This is that something. It compares against the sibling checkout when there is one, and
 * SKIPS when there is not: the drift is then visible on the machine of whoever works on both,
 * which is the only machine where it can be fixed, without breaking the build for anyone else.
 */
class EventConductorSchemaDriftTest {

    /** Where a sibling checkout of EventConductor keeps each schema. */
    private static final String WORKFLOW_SCHEMA =
            "modules/workflow-engine/src/main/resources/workflow-definition-schema.json";
    private static final String FORM_SCHEMA =
            "modules/forms-engine/src/main/resources/form-schema.json";

    @Test
    void theVendoredWorkflowSchemaMatchesEventConductors() throws Exception {
        var published = sibling(WORKFLOW_SCHEMA);
        assumeTrue(published != null, "sin checkout hermano de eventconductor: nada que comparar");

        assertEquals(Files.readString(published), EventConductorSchema.workflowSchemaJson(),
                "la copia de workflow-definition-schema.json se ha quedado atrás:"
                        + " cópiala otra vez desde " + published + " y corre los tests");
    }

    @Test
    void theVendoredFormSchemaMatchesEventConductors() throws Exception {
        var published = sibling(FORM_SCHEMA);
        assumeTrue(published != null, "sin checkout hermano de eventconductor: nada que comparar");

        assertEquals(Files.readString(published), EventConductorSchema.formSchemaJson(),
                "la copia de form-schema.json se ha quedado atrás");
    }

    /**
     * The vocabulary is read, not restated. This is the guard against the failure that was
     * actually there: a hand-written list agreeing with itself while the engine had moved on.
     */
    @Test
    void theStepVocabularyComesFromTheSchema() {
        var types = EventConductorSchema.stepTypes();

        assertThat(types).contains("ACTION", "JOIN", "FORK", "END", "USER_TASK", "PROCESS");
        // the five the hard-coded list was missing
        assertThat(types).contains("START", "TIMER", "WAIT_FOR_MESSAGE", "SEND_MESSAGE", "RULE");
        assertThat(EventConductorSchema.requiredStepFields()).contains("id", "type", "name");
        assertThat(EventConductorSchema.stepFields()).contains("topic", "formId", "compensationStepId");
        assertFalse(EventConductorSchema.formDataTypes().isEmpty());
    }

    /** The sibling checkout, resolved the way §4.7 resolves a referenced project. */
    private static Path sibling(String relative) {
        var here = Path.of("").toAbsolutePath();
        for (var root = here; root != null; root = root.getParent()) {
            var candidate = root.resolveSibling("eventconductor").resolve(relative);
            if (Files.isRegularFile(candidate)) return candidate;
        }
        return null;
    }
}
