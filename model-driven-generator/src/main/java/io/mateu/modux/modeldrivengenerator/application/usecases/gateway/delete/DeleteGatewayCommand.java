package io.mateu.modux.modeldrivengenerator.application.usecases.gateway.delete;

import java.util.List;

public record DeleteGatewayCommand(List<String> ids) {
}
