package io.mateu.modux.modeldrivengenerator.domain.aggregates.gateway.vo;

/** A path/query/header/cookie parameter of a gateway operation. */
public record GatewayParameter(
        String name,
        String location,
        String type,
        boolean required
) {
}
