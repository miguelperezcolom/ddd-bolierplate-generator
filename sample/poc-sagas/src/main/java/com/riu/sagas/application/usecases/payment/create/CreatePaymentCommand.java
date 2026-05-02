package com.riu.sagas.application.usecases.payment.create;

import java.math.BigDecimal;

public record CreatePaymentCommand(BigDecimal value) {}
