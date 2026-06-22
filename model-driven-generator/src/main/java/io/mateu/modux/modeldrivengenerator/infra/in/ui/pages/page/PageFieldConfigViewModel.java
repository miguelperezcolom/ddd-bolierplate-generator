package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;
import jakarta.validation.constraints.NotEmpty;

public record PageFieldConfigViewModel(
        @NotEmpty String fieldId,
        PageFieldStereotype stereotype,
        Integer colspan,
        String style,
        String cssClass,
        String label,
        String help
) {
}
