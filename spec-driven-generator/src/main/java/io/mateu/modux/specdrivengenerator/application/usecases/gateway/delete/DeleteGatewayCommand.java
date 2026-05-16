package io.mateu.modux.specdrivengenerator.application.usecases.gateway.delete;

import java.util.List;

public record DeleteGatewayCommand(List<String> ids) {
}
