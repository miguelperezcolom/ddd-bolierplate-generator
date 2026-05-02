package com.riu.sagas.application.usecases.payment.update;

import java.math.BigDecimal;

public record UpdatePaymentCommand(String id, BigDecimal value) {}
