package io.mateu.modux.modeldrivengenerator.domain.aggregates.page;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;

public record PageFieldConfig(
        String fieldId,
        PageFieldStereotype stereotype,
        Integer colspan,
        String style,
        String cssClass,
        String label,
        String help
) {
}
