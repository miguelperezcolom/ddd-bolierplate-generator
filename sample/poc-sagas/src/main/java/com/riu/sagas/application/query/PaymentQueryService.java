package com.riu.sagas.application.query;

import com.riu.sagas.application.query.dto.PaymentDto;
import com.riu.sagas.application.query.dto.PaymentRow;

public interface PaymentQueryService extends QueryService<PaymentDto, PaymentRow, Long> {}
