package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;
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
