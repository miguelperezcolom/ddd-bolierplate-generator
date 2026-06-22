package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record EnumDefinitionDto(String id, List<EnumDefinitionValueDto> values) {
}
