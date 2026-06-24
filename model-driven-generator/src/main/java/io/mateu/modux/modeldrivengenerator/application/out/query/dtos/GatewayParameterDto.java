package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record GatewayParameterDto(
        String name,
        String location,
        String type,
        boolean required
) {
}
