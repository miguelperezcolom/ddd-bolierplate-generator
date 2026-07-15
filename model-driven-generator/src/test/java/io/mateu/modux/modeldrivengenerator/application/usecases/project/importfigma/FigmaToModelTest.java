package io.mateu.modux.modeldrivengenerator.application.usecases.project.importfigma;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import java.io.InputStream;
import org.junit.jupiter.api.Test;

/**
 * Figma → modux mapping through the Mateu design contract: frames become pages, Mateu/* instances
 * become nodes of the contract's kind (variants + #config + text overrides as params), sections
 * absorb the siblings that follow them (Mateu's @Section semantics), library pages are skipped and
 * free-hand layers are ignored (loose TEXT keeps mapping to a text node).
 */
class FigmaToModelTest {

    @Test
    void mapsAFigmaFileToPagesThroughTheContract() throws Exception {
        FigmaContract contract = FigmaContract.load(null);
        com.fasterxml.jackson.databind.JsonNode file;
        try (InputStream in = getClass().getResourceAsStream("/figma/checkin-file.json")) {
            file = new ObjectMapper().readTree(in);
        }

        var pages = new FigmaToModel(contract).map(file);

        // the library canvas ("Mateu · Display") is skipped
        assertThat(pages).hasSize(1);
        var page = pages.get(0);
        assertThat(page.id()).isEqualTo("check-in");
        assertThat(page.route()).isEqualTo("/check-in");
        // the frame contains a Mateu/Page/Wizard instance → the page is a wizard
        assertThat(page.type()).isEqualTo("wizard");

        var content = page.content();
        // wizard header, then the Documento section (which absorbed the field + notice + text)
        assertThat(content).extracting(UiComponentNodeEntity::kind)
                .containsExactly("wizard", "section");

        var wizard = content.get(0);
        assertThat(wizard.title()).isEqualTo("Check-In");
        assertThat(wizard.params()).containsEntry("progress", "steps");

        var section = content.get(1);
        assertThat(section.title()).isEqualTo("Documento");
        assertThat(section.params())
                .containsEntry("propertyList", "true")
                .containsEntry("frameless", "true")
                .containsEntry("sticky", "false"); // every variant axis travels; codegen skips defaults
        // section absorbed the following siblings, in order
        assertThat(section.children()).extracting(UiComponentNodeEntity::kind)
                .containsExactly("field", "notice", "text");

        var field = section.children().get(0);
        assertThat(field.label()).isEqualTo("Email");
        assertThat(field.fieldId()).isEqualTo("email");

        var notice = section.children().get(1);
        assertThat(notice.text()).isEqualTo("2 quejas pendientes");
        assertThat(notice.params())
                .containsEntry("theme", "danger")
                .containsEntry("slim", "true");

        var looseText = section.children().get(2);
        assertThat(looseText.text()).isEqualTo("Nota suelta");
    }
}
