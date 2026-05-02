package com.riu.sagas.infra.out.persistence;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PaymentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_seq_gen")
  @SequenceGenerator(
      name = "payment_seq_gen",
      sequenceName = "payment_sequence",
      allocationSize = 1)
  Long id;

  @Column(name = "col_value")
  BigDecimal value;
}
