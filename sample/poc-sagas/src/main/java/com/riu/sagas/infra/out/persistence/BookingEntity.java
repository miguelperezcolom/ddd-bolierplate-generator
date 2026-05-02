package com.riu.sagas.infra.out.persistence;

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
public class BookingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "booking_seq_gen")
  @SequenceGenerator(
      name = "booking_seq_gen",
      sequenceName = "booking_sequence",
      allocationSize = 1)
  Long id;

  @Column(name = "col_locator")
  String locator;

  @Column(name = "col_leadName")
  String leadName;

  @Column(name = "col_comments")
  String comments;
}
