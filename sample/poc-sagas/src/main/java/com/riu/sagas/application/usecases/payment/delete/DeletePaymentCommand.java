package com.riu.sagas.application.usecases.payment.delete;

import java.util.List;

public record DeletePaymentCommand(List<String> ids) {}
