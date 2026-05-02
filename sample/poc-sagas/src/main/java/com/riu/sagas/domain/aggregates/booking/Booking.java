package com.riu.sagas.domain.aggregates.booking;

import io.mateu.workflow.ddd.AggregateRoot;
import com.riu.sagas.domain.aggregates.booking.vo.BookingId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Booking extends AggregateRoot {

  BookingId id;

  String locator;
  String leadName;
  String comments;

  public static Booking of(String locator, String leadName, String comments) {
    Booking p = new Booking();
    p.locator = locator;
    p.leadName = leadName;
    p.comments = comments;
    p.checkInvariants();
    return p;
  }

  public void update(String locator, String leadName, String comments) {
    this.locator = locator;
    this.leadName = leadName;
    this.comments = comments;
    checkInvariants();
  }

  public void confirm(ConfirmBookingOperation operation) {
    checkConfirmPreconditions();

    operation.execute(new DefaultBookingOperationContext());

    checkInvariants();
  }

  private void checkConfirmPreconditions() {
    // TODO precondition:
  }

  private void checkInvariants() {}

  private class DefaultBookingOperationContext implements BookingOperationContext {

    @Override
    public BookingId id() {
      return Booking.this.id;
    }

    @Override
    public void id(BookingId id) {
      Booking.this.id = id;
    }

    @Override
    public String locator() {
      return Booking.this.locator;
    }

    @Override
    public void locator(String locator) {
      Booking.this.locator = locator;
    }

    @Override
    public String leadName() {
      return Booking.this.leadName;
    }

    @Override
    public void leadName(String leadName) {
      Booking.this.leadName = leadName;
    }

    @Override
    public String comments() {
      return Booking.this.comments;
    }

    @Override
    public void comments(String comments) {
      Booking.this.comments = comments;
    }
  }
}
