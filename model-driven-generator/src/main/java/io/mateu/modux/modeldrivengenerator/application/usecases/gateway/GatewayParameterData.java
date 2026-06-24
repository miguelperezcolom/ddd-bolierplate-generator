package io.mateu.modux.modeldrivengenerator.application.usecases.gateway;

public record GatewayParameterData(
        String name,
        String location,
        String type,
        boolean required
) {
}
