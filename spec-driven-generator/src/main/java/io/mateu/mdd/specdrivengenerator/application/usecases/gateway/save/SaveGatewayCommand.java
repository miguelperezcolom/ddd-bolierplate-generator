package io.mateu.mdd.specdrivengenerator.application.usecases.gateway.save;

import io.mateu.mdd.specdrivengenerator.application.usecases.gateway.GatewayOperationData;

import java.util.List;

public record SaveGatewayCommand(String id, String name, List<GatewayOperationData> operations) {
}
