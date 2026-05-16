package io.mateu.modux.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ModelDto(String id, String name, List<ModelFieldDto> fields, List<ModelValidationDto> validations) {
}
