package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record ServiceDto(String id, String name, List<String> moduleIds) {
}
