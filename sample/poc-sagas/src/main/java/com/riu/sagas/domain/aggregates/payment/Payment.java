package com.riu.sagas.domain.aggregates.payment;

import java.math.BigDecimal;
import io.mateu.workflow.ddd.AggregateRoot;
import com.riu.sagas.domain.aggregates.payment.vo.PaymentId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Payment extends AggregateRoot {

  PaymentId id;

  BigDecimal value;

  public static Payment of(BigDecimal value) {
    Payment p = new Payment();
    p.value = value;
    p.checkInvariants();
    return p;
  }

  public void update(BigDecimal value) {
    this.value = value;
    checkInvariants();
  }

  private void checkInvariants() {}
}
