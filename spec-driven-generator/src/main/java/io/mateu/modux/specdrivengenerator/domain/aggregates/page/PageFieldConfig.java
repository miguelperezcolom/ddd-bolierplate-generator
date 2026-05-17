package io.mateu.modux.specdrivengenerator.domain.aggregates.page;

import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;

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
