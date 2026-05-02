package com.riu.sagas.application.out;

import com.riu.sagas.domain.aggregates.payment.Payment;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;

public interface PaymentRepository extends Repository<Payment, PaymentId> {}
