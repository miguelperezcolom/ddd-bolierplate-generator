package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

import java.util.List;

public record GatewayDto(String id, String name, List<GatewayOperationDto> operations) {
}
