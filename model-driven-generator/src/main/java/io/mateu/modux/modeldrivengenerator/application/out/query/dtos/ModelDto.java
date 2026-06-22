package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModelDto(String id, String name, List<ModelFieldDto> fields, List<ModelValidationDto> validations) {
}
