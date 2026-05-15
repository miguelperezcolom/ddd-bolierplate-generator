package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.create;

import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;

import java.util.List;

public record CreateGatewayCommand(String id, String name, List<GatewayOperationData> operations) {
}
